export const metadata = {
  title: "Instagram Auto Poster",
  description: "Post images to Instagram Business via Graph API"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji"',
          background: "#0b1220",
          color: "#e8eef9",
          minHeight: "100vh",
          margin: 0
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "24px" }}>
          {children}
        </div>
      </body>
    </html>
  );
}

