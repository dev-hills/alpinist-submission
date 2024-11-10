import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

type formType = {
  slackUsername: string;
  githubUsername: string;
  linkToRepo: string;
  liveUrl: string;
  learnt: string;
};

export async function POST(req: Request) {
  const supabase = await createClient();

  try {
    const data: formType = await req.json();
    const { error } = await supabase.from("submissions").insert(data);

    if (error) {
      console.log(error);
      return NextResponse.json({ error: "Failed to Submit" }, { status: 500 });
    }

    return NextResponse.json({
      status: 200,
      success: true,
      message: "Logged successfully.",
    });
  } catch (error) {
    console.error("unable to submit", error);
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}
