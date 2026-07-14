import InteractionForm from "./InteractionForm";
import ChatPanel from "./ChatPanel";

function Layout() {
  return (
    <main className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-140px)]">

        {/* Left Panel */}

        <section className="col-span-8 bg-white rounded-xl shadow-md border border-gray-200 overflow-y-auto p-6">

          <InteractionForm />

        </section>

        {/* Right Panel */}

        <section className="col-span-4 bg-white rounded-xl shadow-md border border-gray-200 flex flex-col p-6">

          <ChatPanel />

        </section>

      </div>
    </main>
  );
}

export default Layout;