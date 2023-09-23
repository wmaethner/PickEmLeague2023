import { ReleaseNotesSchema } from "../apis";
import { emptyArray } from "./extensions/arrayExtensions";


export const unreadReleaseNotes = (releaseNotes: ReleaseNotesSchema[], readNotes: number[]): number[] => {
  return releaseNotes.map(r => r.id).filter(id => !readNotes.includes(id));
}

export const hasUnreadReleaseNotes = (releaseNotes: ReleaseNotesSchema[], readNotes: number[]): boolean => {
  return !emptyArray(unreadReleaseNotes(releaseNotes, readNotes));
}

