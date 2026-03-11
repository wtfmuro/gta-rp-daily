// Prevents console window in release build on Windows
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::fs;
use tauri::Manager;

#[tauri::command]
fn load_state(app: tauri::AppHandle) -> String {
    let path = match app.path().app_data_dir() {
        Ok(dir) => dir.join("state.json"),
        Err(_) => return "null".to_string(),
    };
    if path.exists() {
        fs::read_to_string(&path).unwrap_or_else(|_| "null".to_string())
    } else {
        "null".to_string()
    }
}

#[tauri::command]
fn save_state(app: tauri::AppHandle, state: String) -> bool {
    let dir = match app.path().app_data_dir() {
        Ok(d) => d,
        Err(_) => return false,
    };
    let _ = fs::create_dir_all(&dir);
    fs::write(dir.join("state.json"), state).is_ok()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![load_state, save_state])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
