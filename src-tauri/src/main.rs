// Prevents console window in release build on Windows
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
use tauri::{Manager, WindowEvent};

// ─── File helpers ────────────────────────────────────────────────────────────────

fn state_path() -> std::path::PathBuf {
    let exe = std::env::current_exe().expect("can't find exe path");
    exe.parent().unwrap().join("state.json")
}

fn winpos_path() -> std::path::PathBuf {
    let exe = std::env::current_exe().expect("can't find exe path");
    exe.parent().unwrap().join("winpos.json")
}

fn timers_path() -> std::path::PathBuf {
    let exe = std::env::current_exe().expect("can't find exe path");
    exe.parent().unwrap().join("timers.json")
}

// ─── Existing commands ───────────────────────────────────────────────────────────

#[tauri::command]
fn load_state() -> String {
    let path = state_path();
    if path.exists() {
        std::fs::read_to_string(&path).unwrap_or_else(|_| "null".to_string())
    } else {
        "null".to_string()
    }
}

#[tauri::command]
fn save_state(state: String) -> bool {
    std::fs::write(state_path(), state).is_ok()
}

// ─── Timer commands ──────────────────────────────────────────────────────────────

#[derive(Debug, Clone, Serialize, Deserialize)]
struct TimerEntry {
    id: String,
    name: String,
    duration: u32,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
struct TimersFile {
    timers: Vec<TimerEntry>,
    ordered_ids: Vec<String>,
}

#[tauri::command]
fn read_custom_timers() -> TimersFile {
    let path = timers_path();
    if path.exists() {
        if let Ok(raw) = std::fs::read_to_string(&path) {
            if let Ok(data) = serde_json::from_str::<TimersFile>(&raw) {
                return data;
            }
        }
    }
    TimersFile {
        timers: vec![],
        ordered_ids: vec![],
    }
}

#[tauri::command]
fn write_custom_timers(timers: Vec<TimerEntry>, ordered_ids: Vec<String>) -> bool {
    let path = timers_path();
    let tmp_path = path.with_extension("tmp");
    let data = TimersFile {
        timers,
        ordered_ids,
    };
    match serde_json::to_string_pretty(&data) {
        Ok(json) => {
            if std::fs::write(&tmp_path, json).is_ok() {
                std::fs::rename(&tmp_path, &path).is_ok()
            } else {
                false
            }
        }
        Err(_) => false,
    }
}

// ─── Main ────────────────────────────────────────────────────────────────────────

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            load_state,
            save_state,
            read_custom_timers,
            write_custom_timers
        ])
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();

            // Restore saved position then show window
            if let Ok(raw) = std::fs::read_to_string(winpos_path()) {
                if let Ok(pos) = serde_json::from_str::<serde_json::Value>(&raw) {
                    let x = pos["x"].as_f64().unwrap_or(0.0);
                    let y = pos["y"].as_f64().unwrap_or(0.0);
                    let _ = window.set_position(tauri::PhysicalPosition::new(x as i32, y as i32));
                }
            }
            let _ = window.show();

            // Save position on close
            let window_clone = window.clone();
            window.on_window_event(move |event| {
                if let WindowEvent::CloseRequested { .. } = event {
                    if let Ok(pos) = window_clone.outer_position() {
                        let json = format!("{{\"x\":{},\"y\":{}}}", pos.x, pos.y);
                        let _ = std::fs::write(winpos_path(), json);
                    }
                }
            });

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
