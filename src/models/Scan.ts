import mongoose, { Schema, model, models } from "mongoose";

const ScanSchema = new Schema(
  {
    url: { type: String, required: true },
    title: String,
    gdprScore: Number,
    w3cScore: Number,
    accessibilityScore: Number,
    issues: [
      {
        name: String,
        percent: Number,
      },
    ],
    durationMs: Number,
  },
  { timestamps: true }
);

export const Scan = models.Scan || model("Scan", ScanSchema);
