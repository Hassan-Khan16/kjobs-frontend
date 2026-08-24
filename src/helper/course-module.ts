import type { CourseModuleDraft, CreateCourseDraft } from "@/types/admin-course";

export const isLastModuleEmpty = (modules: CourseModuleDraft[]) => {
  if (!modules.length) return true;

  const lastModule = modules[modules.length - 1];

  return !lastModule.lessons || lastModule.lessons.length === 0;
};


export function mapModules(modules?: Module[]): Module[] | undefined {
  if (!Array.isArray(modules)) return undefined;

  return modules.map((m) => ({
    id: m.id,
    title: m.title,
  }));
}

export function mapAssessment(payload: CreateCourseDraft["finalAssessment"]) {
  if (!payload.payload) return null;

  return {
    title: payload.payload.name,
    description: "",
    questions: payload.payload.questions || [],
  };
}

export function resolveVideoUrl(payload: CreateCourseDraft["courseInfo"]) {
  if (payload.videoSource !== "upload") return payload.videoUrl;

  if (!payload.videoFile) return payload.videoUrl;

  return typeof payload.videoFile === "string"
    ? payload.videoFile
    : `uploaded-video-${payload.videoFile.name}`;
}