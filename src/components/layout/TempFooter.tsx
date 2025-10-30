export default function TempFooter() {
  return (
    <footer className="w-full bg-black">
      <div className="mx-auto max-w-6xl px-4 py-2 text-center text-[11px] text-white/80">
        © {new Date().getFullYear()} Privacy Analyser
      </div>
    </footer>
  );
}
