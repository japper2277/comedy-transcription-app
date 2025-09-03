#!/usr/bin/env python3
"""
Check which files were uploaded to Drive vs which ones are missing
"""

import os
import json
from pathlib import Path
import fnmatch

def get_all_local_files(project_root):
    """Get all local files that should be uploaded"""
    exclude_patterns = [
        '__pycache__', '*.pyc', '*.pyo', '.git', 'node_modules', 
        '.env', '*.log', 'fresh_venv', 'venv', '.vscode', '.idea', 
        'dist', 'build', '*.tmp', 'temp_uploads', 'logs'
    ]
    
    local_files = set()
    for root, dirs, files in os.walk(project_root):
        # Filter directories
        dirs[:] = [d for d in dirs if not any(fnmatch.fnmatch(d, pattern) for pattern in exclude_patterns)]
        
        # Add files
        for file in files:
            if not any(fnmatch.fnmatch(file, pattern) for pattern in exclude_patterns):
                file_path = os.path.join(root, file)
                local_files.add(file_path)
    
    return local_files

def check_upload_status():
    """Compare uploaded files vs local files"""
    project_root = Path(__file__).parent
    manifest_path = project_root / "drive_upload_manifest.json"
    
    if not manifest_path.exists():
        print("ERROR: Upload manifest not found!")
        return
    
    # Load uploaded files from manifest
    with open(manifest_path, 'r') as f:
        manifest = json.load(f)
    
    uploaded_files = set(manifest.keys())
    
    # Get all local files that should be uploaded
    local_files = get_all_local_files(str(project_root))
    
    # Compare
    missing_files = local_files - uploaded_files
    extra_files = uploaded_files - local_files
    
    print("=" * 60)
    print("UPLOAD STATUS REPORT")
    print("=" * 60)
    print(f"Total local files: {len(local_files)}")
    print(f"Files uploaded: {len(uploaded_files)}")
    print(f"Missing files: {len(missing_files)}")
    print(f"Extra files in manifest: {len(extra_files)}")
    
    if missing_files:
        print("\nMISSING FILES (not uploaded):")
        for file in sorted(missing_files)[:20]:  # Show first 20
            rel_path = os.path.relpath(file, str(project_root))
            print(f"  - {rel_path}")
        if len(missing_files) > 20:
            print(f"  ... and {len(missing_files) - 20} more files")
    
    if extra_files:
        print("\nEXTRA FILES (in manifest but not local):")
        for file in sorted(extra_files)[:10]:  # Show first 10
            if os.path.exists(file):
                continue  # File exists, just different case or something
            rel_path = os.path.relpath(file, str(project_root))
            print(f"  - {rel_path}")
    
    # Check important directories
    important_dirs = [
        "transcription-service",
        "css", 
        "js",
        "src"
    ]
    
    print("\n📁 DIRECTORY STATUS:")
    for dir_name in important_dirs:
        dir_path = project_root / dir_name
        if dir_path.exists():
            uploaded_from_dir = [f for f in uploaded_files if dir_name in f]
            local_in_dir = [f for f in local_files if dir_name in f]
            print(f"  {dir_name}/: {len(uploaded_from_dir)} uploaded, {len(local_in_dir)} local")
    
    # Success rate
    if len(local_files) > 0:
        success_rate = (len(uploaded_files & local_files) / len(local_files)) * 100
        print(f"\n✅ Upload success rate: {success_rate:.1f}%")
    
    if len(missing_files) == 0:
        print("\n🎉 SUCCESS: All files uploaded successfully!")
    else:
        print(f"\n⚠️  {len(missing_files)} files need to be uploaded")

if __name__ == "__main__":
    check_upload_status()