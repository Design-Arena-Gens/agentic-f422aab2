import PostForm from "@/components/PostForm";

export default function Page() {
  return (
    <main>
      <h1 style={{ fontSize: 28, margin: 0 }}>Instagram Auto Poster</h1>
      <p style={{ opacity: 0.8, marginTop: 8 }}>
        Publish image posts to your Instagram Business account via server-side API.
      </p>
      <div style={{ marginTop: 24 }}>
        <PostForm />
      </div>
      <section style={{ marginTop: 32, fontSize: 14, opacity: 0.8 }}>
        <p>
          This demo requires server environment variables:{" "}
          <code>IG_USER_ID</code> and <code>IG_ACCESS_TOKEN</code>.
        </p>
        <p>
          Only Business or Creator accounts are supported per Instagram Graph API
          policies. Video/Reels not supported in this demo.
        </p>
      </section>
    </main>
  );
}

