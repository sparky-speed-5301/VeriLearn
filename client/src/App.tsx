import { useLocation } from "wouter";
import Home from "./pages/Home";
import Workspace from "./pages/Workspace";
import UploadLecture from "./pages/UploadLecture";
import LectureWorkspace from "./pages/LectureWorkspace";
import Concepts from "./pages/Concepts";
import Quiz from "./pages/Quiz";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

export default function App() {
  const [location] = useLocation();
  const [rawPath, rawQuery = ""] = location.split("?");
  const path = rawPath.replace(/\/+$/, "") || "/";
  if (path === "/") {
    if (typeof window !== "undefined") {
      window.location.href = "http://localhost:3100/";
    }
    return null;
  }
  if (path === "/workspace") return <Workspace />;
  if (path === "/workspace/upload") return <UploadLecture />;
  if (path === "/settings") return <Settings />;
  const lectureMatch = path.match(/^\/lecture\/([^/]+)(?:\/(concepts|quiz))?$/);
  if (lectureMatch) {
    const [, id, subroute] = lectureMatch;
    if (subroute === "concepts") return <Concepts id={id} />;
    if (subroute === "quiz") return <Quiz id={id} />;
    return <LectureWorkspace id={id} sourceSegmentId={new URLSearchParams(rawQuery).get("segment") ?? undefined} />;
  }
  if (path === "/404") return <NotFound />;
  return <NotFound />;
}
