import { PUBLIC_SEEKERS, type PublicSeeker } from "@/data/public-seekers";
import { delay } from "@/helper/local-store";

export async function listPublicSeekers(params: {
  q?: string;
  filter?: string;
}): Promise<{ success: boolean; message: string; data: PublicSeeker[] }> {
  await delay();
  const query = params.q?.trim().toLowerCase() ?? "";
  const filter = params.filter && params.filter !== "All talent" ? params.filter.toLowerCase() : "";

  const data = PUBLIC_SEEKERS.filter((seeker) => {
    const matchesQuery =
      !query ||
      [seeker.name, seeker.title, seeker.location, ...seeker.skills]
        .join(" ")
        .toLowerCase()
        .includes(query);
    const matchesFilter =
      !filter ||
      seeker.title.toLowerCase().includes(filter) ||
      seeker.skills.some((skill) => skill.toLowerCase().includes(filter));
    return matchesQuery && matchesFilter;
  });

  return { success: true, message: "Seekers loaded", data };
}
