from ultralytics import YOLO
import torch
import sys
import io
from datetime import datetime
import pandas as pd
import os

if __name__ == "__main__":
    # === Setup ===
    model_path  = "D:/Licenta/FoodDetection/Food_Detection/YOLOv8_approach/runs/detect/train38/weights/best.pt"
    data_yaml   = "D:/Licenta/FoodDetection/Food_Detection/YOLOv8_approach/dataset/data.yaml"
    report_path = "validation_report4.txt"

    # === Capture all stdout into buffer ===
    buffer = io.StringIO()
    sys.stdout = buffer

    print(f"📋 Validation Report - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 80)

    # === System info ===
    try:
        print(f"CUDA available: {torch.cuda.is_available()}")
        if torch.cuda.is_available():
            print(f"Using GPU: {torch.cuda.get_device_name(0)}")
    except Exception as e:
        print(f"[!] Could not get CUDA info: {e}")

    # === Load model ===
    try:
        model = YOLO(model_path)
        print(f"\n✅ Model loaded: {model_path}")
    except Exception as e:
        print(f"[!] Failed to load model: {e}")
        sys.stdout = sys.__stdout__
        with open(report_path, "w", encoding="utf-8") as f:
            f.write(buffer.getvalue())
        sys.exit(1)

    # === Model architecture summary ===
    try:
        print("\n📦 Model Architecture:")
        model.info(verbose=True)
    except Exception as e:
        print(f"[!] Failed to print model info: {e}")

    # === Run validation ===
    try:
        print("\n🧪 Running validation...\n")
        metrics = model.val(data=data_yaml, imgsz=640, save=True, plots=True)
    except Exception as e:
        print(f"[!] Validation failed: {e}")
        sys.stdout = sys.__stdout__
        with open(report_path, "w", encoding="utf-8") as f:
            f.write(buffer.getvalue())
        sys.exit(2)

    # === Global metrics ===
    try:
        print("\n📊 Summary Metrics:")
        print(f"mAP50-95:      {metrics.box.map:.4f}")
        print(f"mAP50:         {metrics.box.map50:.4f}")
        print(f"mAP75:         {metrics.box.map75:.4f}")
        print(f"Precision (mean):  {metrics.box.mp():.4f}")
        print(f"Recall (mean):     {metrics.box.mr():.4f}")
        print(f"Outputs saved to: {metrics.save_dir}")
    except Exception as e:
        print(f"[!] Could not extract summary metrics: {e}")

    # === Per-class metrics ===
    try:
        print("\n📋 Per-Class Metrics (if available):")
        for i in range(metrics.box.nc):
            p, r, ap50, ap = metrics.box.class_result(i)
            print(f"Class {i} - Precision: {p:.3f}, Recall: {r:.3f}, AP50: {ap50:.3f}, AP50-95: {ap:.3f}")

    except Exception as e:
        print(f"[!] Could not extract per-class metrics: {e}")

    # === Plots ===
    try:
        cm_path = os.path.join(metrics.save_dir, "confusion_matrix.png")
        pr_path = os.path.join(metrics.save_dir, "PR_curve.png")
        f1_path = os.path.join(metrics.save_dir, "F1_curve.png")

        print("\n🖼️ Plots generated:")
        print(f"✓ Confusion matrix:       {'✔️ ' + cm_path if os.path.exists(cm_path) else 'Not found'}")
        print(f"✓ Precision-Recall curve: {'✔️ ' + pr_path if os.path.exists(pr_path) else 'Not found'}")
        print(f"✓ F1 score curve:         {'✔️ ' + f1_path if os.path.exists(f1_path) else 'Not found'}")
    except Exception as e:
        print(f"[!] Could not list plots: {e}")

    print("=" * 80)

    # === Save report ===
    sys.stdout = sys.__stdout__
    try:
        with open(report_path, "w", encoding="utf-8") as f:
            f.write(buffer.getvalue())
        print(f"\n✅ Validation report saved to: {report_path}")
    except Exception as e:
        print(f"[!] Could not save report: {e}")
