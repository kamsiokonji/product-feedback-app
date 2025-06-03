"use client";

import { useSession } from "@/lib/auth-client";
import { SignOutButton } from "@/components/auth-form/sign-out-button";

export default function Home() {
  const { data: session, isPending } = useSession();

  console.log(session);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Not logged in</div>;
  }

  return (
    <div>
      <h1>Hello World</h1>
      <pre>{JSON.stringify(session?.user.email, null, 2)}</pre>
      <h1>{session?.user.name}</h1>

      <SignOutButton />
    </div>
  );
}
