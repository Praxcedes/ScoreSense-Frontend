export default function AdminHeader() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-green-900/40">
      <div>
        <h1 className="text-xl font-bold text-green-400">Admin Console</h1>
        <p className="text-xs text-gray-400">v2.4.0 • KE-East-1</p>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-green-400">AdminUser</span>
        <div className="w-9 h-9 rounded-full bg-green-500/20 flex items-center justify-center">
          👤
        </div>
      </div>
    </header>
  );
}
