import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  console.log(session);

  return (
    <div>
      <h1>Hello World</h1>
      <pre>{JSON.stringify(session?.user.email, null, 2)}</pre>
      <h1>{session?.user.email}</h1>
    </div>
  );
}
