"use client";

import { useCallback, useMemo, useState } from "react";

type ApiResponse =
  | { ok: true; id: string }
  | { ok: false; error: string; details?: unknown };

export default function PostForm() {
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<ApiResponse | null>(null);

  const isValidUrl = useMemo(() => {
    try {
      if (!imageUrl) return false;
      const u = new URL(imageUrl);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  }, [imageUrl]);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setResult(null);
      if (!isValidUrl) return;
      setSubmitting(true);
      try {
        const res = await fetch("/api/post", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageUrl, caption })
        });
        const data = (await res.json()) as ApiResponse;
        setResult(data);
      } catch (err) {
        setResult({
          ok: false,
          error: "Request failed",
          details: (err as Error)?.message
        });
      } finally {
        setSubmitting(false);
      }
    },
    [imageUrl, caption, isValidUrl]
  );

  return (
    <form onSubmit={onSubmit}>
      <div
        style={{
          display: "grid",
          gap: 16,
          gridTemplateColumns: "1fr",
          maxWidth: 720
        }}
      >
        <label style={{ display: "grid", gap: 8 }}>
          <span>Image URL</span>
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/photo.jpg"
            style={{
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #2a3b59",
              background: "#0f1629",
              color: "inherit"
            }}
            required
            type="url"
          />
        </label>
        <label style={{ display: "grid", gap: 8 }}>
          <span>Caption</span>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption..."
            rows={5}
            style={{
              padding: "10px 12px",
              borderRadius: 8,
              border: "1px solid #2a3b59",
              background: "#0f1629",
              color: "inherit",
              resize: "vertical"
            }}
          />
        </label>

        {isValidUrl ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "240px 1fr",
              gap: 16,
              alignItems: "start"
            }}
          >
            <img
              src={imageUrl}
              alt="preview"
              style={{
                width: 240,
                height: 240,
                objectFit: "cover",
                borderRadius: 12,
                border: "1px solid #203150",
                background: "#0f1629"
              }}
            />
            <div
              style={{
                border: "1px dashed #2c3e60",
                borderRadius: 12,
                padding: 12
              }}
            >
              <div style={{ opacity: 0.75, fontSize: 12, marginBottom: 6 }}>
                Caption preview
              </div>
              <div style={{ whiteSpace: "pre-wrap" }}>{caption || " "}</div>
            </div>
          </div>
        ) : null}

        <div style={{ display: "flex", gap: 12 }}>
          <button
            type="submit"
            disabled={!isValidUrl || submitting}
            style={{
              background: submitting ? "#244d8a" : "#2b6fd6",
              color: "white",
              padding: "10px 14px",
              borderRadius: 10,
              border: 0,
              cursor: submitting ? "not-allowed" : "pointer"
            }}
          >
            {submitting ? "Publishing..." : "Publish to Instagram"}
          </button>
          <span style={{ fontSize: 12, opacity: 0.8, alignSelf: "center" }}>
            Posts immediately; scheduling not included in this demo.
          </span>
        </div>

        {result ? (
          <div
            style={{
              padding: 12,
              borderRadius: 10,
              border: "1px solid",
              borderColor: result.ok ? "#2e7d32" : "#7d2e2e",
              background: result.ok ? "#0e1a12" : "#1a0e0e"
            }}
          >
            {result.ok ? (
              <span>
                Success. Publish ID: <code>{result.id}</code>
              </span>
            ) : (
              <span>
                Error: {result.error}
                {result.details ? (
                  <>
                    {" "}
                    <code style={{ opacity: 0.8 }}>{String(result.details)}</code>
                  </>
                ) : null}
              </span>
            )}
          </div>
        ) : null}
      </div>
    </form>
  );
}

