"use client";

import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Profile } from "@liff/get-profile";

export default function Home() {
  const [profile, setProfile] = useState<Profile>({
    userId: "",
    displayName: "",
    pictureUrl: "",
    statusMessage: "",
  });

  useEffect(() => {
    async () => {
      const liff = (await import("@line/liff")).default;
      try {
        await liff.init({ liffId: "1660806822-nwa8VvQj" });
      } catch (error) {
        console.error("liff init error", error);
      }
      if (!liff.isLoggedIn()) {
        liff.login();
      }
    };
  }, []);

  useEffect(() => {
    async () => {
      const liff = (await import("@line/liff")).default;
      await liff.ready;
      const profile = await liff.getProfile();
      setProfile(profile);
    };
  }, [profile.userId]);

  return (
    <section>
      <Head>
        <title>My Profile</title>
      </Head>
      <h1>Profile</h1>
      <div>
        {profile.pictureUrl && (
          <Image
            src={profile.pictureUrl}
            alt={profile.displayName}
            width={500}
            height={500}
          />
        )}
        <div>Name: {profile.displayName}</div>
      </div>
    </section>
  );
}
