import { Link } from "wouter";

export default function NotFound() { return <div className="not-found"><span className="eyebrow">404 / SOURCE NOT FOUND</span><div className="not-found-number">04</div><h1>This page has no source trail.</h1><p>The requested route is outside the current field manual.</p><Link href="/workspace" className="button button-primary">Return to workspace ↗</Link></div>; }
