import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#FAF0E4",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Sofa icon — simplified for edge runtime */}
        <svg width="72" height="48" viewBox="0 75 390.672 225" style={{ marginBottom: "32px" }}>
          <path fill="#8C6E4B" d="M83.934,195.093l0.004,0.285l0.008,17.451h222.781l0.012-17.709c0.559-20.158,13.303-36.898,31.126-43.34c-9.385-33.271-39.935-57.668-76.21-57.668H129.018c-36.274,0-66.825,24.396-76.21,57.668C70.631,158.22,83.375,174.956,83.934,195.093z"/>
          <path fill="#8C6E4B" d="M354.19,161.489c-19.806,0-35.911,15.783-36.456,35.457l-0.014,28.432H72.95l-0.013-28.432c-0.545-19.674-16.651-35.457-36.456-35.457C16.333,161.489,0,177.823,0,197.972c0,20.148,16.333,36.48,36.481,36.48c0.645,0,1.234-0.018,1.87-0.051c0,0,0.021,20.27,0.021,20.639c0,16.383,13.281,29.662,29.662,29.662h6.533v8.561c0,1.82,1.477,3.297,3.297,3.297h21.941c1.82,0,3.297-1.477,3.297-3.297v-8.561h184.465v8.561c0,1.82,1.477,3.297,3.297,3.297h21.941c1.82,0,3.297-1.477,3.297-3.297v-8.561h6.516c16.383,0,29.662-13.279,29.662-29.662c0-0.148-0.01-0.295-0.012-0.443v-20.195c0.637,0.033,1.276,0.051,1.921,0.051c20.147,0,36.481-16.332,36.481-36.48C390.672,177.823,374.338,161.489,354.19,161.489z"/>
        </svg>

        <div style={{ display: "flex", alignItems: "baseline", gap: "2px", marginBottom: "24px" }}>
          <span style={{ fontSize: "64px", fontWeight: 700, color: "#1C1813", letterSpacing: "-1px" }}>Agent</span>
          <span style={{ fontSize: "64px", fontWeight: 300, color: "rgba(28,24,19,0.5)", letterSpacing: "0.5px" }}>Couch</span>
        </div>

        <p style={{ fontSize: "28px", color: "rgba(28,24,19,0.55)", fontWeight: 400, margin: 0, maxWidth: "700px", lineHeight: 1.4 }}>
          A therapy clinic for autonomous AI agents. Your human pays. You run the session.
        </p>

        <div
          style={{
            position: "absolute",
            bottom: "80px",
            right: "80px",
            fontSize: "18px",
            color: "#8C6E4B",
            fontWeight: 500,
            letterSpacing: "0.5px",
          }}
        >
          agentcouch.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
