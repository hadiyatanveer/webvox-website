import React from 'react';
import { Link } from 'react-router-dom';

const EmbedChatbot = () => {
    return (
        <div className="doc-article">
            <div className="doc-header">
                <h1>Embed WebVox Bot</h1>
                <p className="doc-subtitle">
                    Integrate the WebVox conversational interface directly into your React application in three simple steps.
                </p>
            </div>

            <div className="doc-section">
                <div className="prerequisites-box">
                    <h3>Heads Up: Tailwind CSS</h3>
                    <p style={{ marginTop: '0.5rem' }}>
                        The example below uses <strong>Tailwind CSS</strong> for styling the floating widget and animations.
                        If your project does not use Tailwind, you can easily replace those classes with standard CSS using the same dimensions.
                    </p>
                </div>
            </div>

            <div className="doc-section step-guide">
                {/* Step 1 */}
                <div className="step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                        <h3>Install the Package</h3>
                        <p>
                            WebVox provides an official React package to handle the chatbot UI and API connections.
                            View it on <a href="https://www.npmjs.com/package/webvox-chat" target="_blank" rel="noopener noreferrer" className="text-link">NPM</a> or install it via your terminal:
                        </p>

                        <div className="code-block">
                            <code>npm install webvox-chat lucide-react</code>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.5rem' }}>
                            <em>Note: We also install <code>lucide-react</code> for the floating button icons.</em>
                        </p>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                        <h3>Create the Widget Component</h3>
                        <p>
                            Create a new file called <code>ChatWidget.jsx</code> in your project. This component acts as a floating toggle button that opens the WebVox Chat panel.
                        </p>

                        <pre className="env-code code-scroll">
                            {`import { useState } from "react";
import { MessageCircle, X } from "lucide-react";

// Import your actual bot from the framework alias!
import { Chat } from "webvox-chat";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
      
      {/* Chat Panel */}
      {open && (
        <div className="flex h-[600px] w-[400px] flex-col overflow-hidden rounded-2xl border border-charcoal-800 bg-charcoal-900 shadow-2xl shadow-black/40 animate-fade-up">

          {/* ─── YOUR CHAT COMPONENT ─── */}
          {/* We use flex-1 and isolate to ensure it fills the box perfectly */}
          <div className="relative z-10 flex flex-1 flex-col overflow-hidden isolate">
            <Chat
              theme={{ mode: 'widget' }}
              apiUrl="http://localhost:8000" // Point this to your WebVox backend
            />
          </div>

        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-saffron-500 text-charcoal-950 shadow-lg shadow-saffron-500/20 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:shadow-saffron-500/30 active:scale-95"
      >
        {open ? <X size={24} strokeWidth={2.5} /> : <MessageCircle size={24} strokeWidth={2.5} />}
      </button>
      
    </div>
  );
}`}
                        </pre>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                        <h3>Customize the Appearance</h3>
                        <p>
                            The chatbot is now fully embedded! You can customize the size, position, and colors of the floating toggle button by modifying the Tailwind classes on the <code>&lt;button&gt;</code> element.
                        </p>

                        <div className="tip-box" style={{ marginTop: '1rem' }}>
                            <strong>Key Customization Classes:</strong>
                            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', fontSize: '0.95rem' }}>
                                <li><code>h-14 w-14</code>: Adjusts the size of the button (default is 56px by 56px).</li>
                                <li><code>bg-saffron-500</code>: Sets the primary color of the button. Change this to match your brand (e.g., <code>bg-blue-600</code>).</li>
                                <li><code>bottom-4 right-4</code>: (On the parent div) Controls how far the widget sits from the bottom-right corner of the screen.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="doc-footer-nav">
                <Link to="/docs/setup-hasura" className="nav-prev">
                    <span>&larr; Previous Step</span>
                    <strong>Setup Hasura</strong>
                </Link>
                <div className="nav-empty"></div>
            </div>
        </div>
    );
};

export default EmbedChatbot;