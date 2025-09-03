import logging
import sys
from pathlib import Path

def setup_logging(environment: str = "development"):
    """Set up logging configuration for the application"""
    
    # Create logs directory
    logs_dir = Path(__file__).parent.parent / "logs"
    logs_dir.mkdir(exist_ok=True)
    
    # Configure logging level based on environment
    if environment == "production":
        log_level = logging.WARNING
        log_format = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
    else:
        log_level = logging.INFO
        log_format = "%(asctime)s - %(name)s - %(levelname)s - [%(filename)s:%(lineno)d] - %(message)s"
    
    # Clear existing handlers
    logging.getLogger().handlers.clear()
    
    # Console handler with safe encoding
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(log_level)
    
    # Use ASCII-safe formatter for Windows console
    console_formatter = logging.Formatter(log_format)
    console_handler.setFormatter(console_formatter)
    
    # File handler for persistent logging
    file_handler = logging.FileHandler(
        logs_dir / "transcription_service.log",
        encoding='utf-8'
    )
    file_handler.setLevel(log_level)
    file_formatter = logging.Formatter(log_format)
    file_handler.setFormatter(file_formatter)
    
    # Configure root logger
    root_logger = logging.getLogger()
    root_logger.setLevel(log_level)
    root_logger.addHandler(console_handler)
    root_logger.addHandler(file_handler)
    
    # Configure specific loggers
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
    logging.getLogger("uvicorn.error").setLevel(logging.INFO)
    
    # Application logger
    app_logger = logging.getLogger("transcription_service")
    app_logger.info(f"Logging configured for {environment} environment")
    app_logger.info(f"Log file: {logs_dir / 'transcription_service.log'}")
    
    return app_logger

def get_logger(name: str):
    """Get a logger with the specified name"""
    return logging.getLogger(name)