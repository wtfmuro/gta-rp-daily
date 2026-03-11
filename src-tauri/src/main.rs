// Prevents console window in release build on Windows
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

fn state_path() -> std::path::PathBuf {
    let exe = std::env::current_exe().expect("can't find exe path");
    exe.parent().unwrap().join("state.json")
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
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}