// Prevents console window in release build on Windows
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Manager, WindowEvent};

fn state_path() -> std::path::PathBuf {
    let exe = std::env::current_exe().expect("can't find exe path");
    exe.parent().unwrap().join("state.json")
}

fn winpos_path() -> std::path::PathBuf {
    let exe = std::env::current_exe().expect("can't find exe path");
    exe.parent().unwrap().join("winpos.json")
}

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

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![load_state, save_state])
        .setup(|app| {
            let window = app.get_webview_window("main").unwrap();

            // Restore saved position
            if let Ok(raw) = std::fs::read_to_string(winpos_path()) {
                if let Ok(pos) = serde_json::from_str::<serde_json::Value>(&raw) {
                    let x = pos["x"].as_f64().unwrap_or(0.0);
                    let y = pos["y"].as_f64().unwrap_or(0.0);
                    let _ = window.set_position(tauri::PhysicalPosition::new(x as i32, y as i32));
                }
            }

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
