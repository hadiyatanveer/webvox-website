import React from 'react';
import { Link } from 'react-router-dom';

const SetupHasura = () => {
    return (
        <div className="doc-article">
            <div className="doc-header">
                <h1>Setting up Hasura for WebVox</h1>
                <p className="doc-subtitle">
                    Configure Hasura to expose a secure GraphQL endpoint over your SQL database for WebVox intent orchestration.
                </p>
            </div>

            <div className="doc-section">
                <div className="prerequisites-box">
                    <h3>Prerequisites</h3>
                    <ul>
                        <li>A running SQL database (for example PostgreSQL or MySQL) containing your application data.</li>
                        <li>Access to create a new Hasura project (Docker, cloud, or existing Hasura instance).</li>
                        <li>Connection details for your database (host, port, database name, username, password).</li>
                    </ul>
                </div>
            </div>

            <div className="doc-section step-guide">
                {/* Step 1 */}
                <div className="step">
                    <div className="step-number">1</div>
                    <div className="step-content">
                        <h3>Deploy Hasura</h3>
                        <p>
                            Use the <a href="https://cloud.hasura.io/signup" target="_blank" rel="noopener noreferrer" className="text-link">Hasura console</a> to sign up and create a new project.
                            Choose a hosting method (free tier which will be limited, or paid) through AWS, Google Cloud, or Azure, and launch the console.
                            <br /><br />
                            <strong>Keep note of the deployed link.</strong>
                        </p>

                        <video 
                            className="doc-video" 
                            autoPlay 
                            muted 
                            loop 
                            playsInline
                        >
                            <source src="/videos/hasura_console.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="step">
                    <div className="step-number">2</div>
                    <div className="step-content">
                        <h3>Connect your database</h3>
                        <p>
                            In the Hasura console, click <strong>Data → Connect Database</strong>.
                            Choose your database type (PostgreSQL, MySQL, etc.).
                            Enter the connection string or individual connection parameters.
                            Save and verify the connection.
                        </p>

                        <video 
                            className="doc-video" 
                            autoPlay 
                            muted 
                            loop 
                            playsInline
                        >
                            <source src="/videos/hasura_data.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="step">
                    <div className="step-number">3</div>
                    <div className="step-content">
                        <h3>Configure Permissions & Metadata</h3>
                        <p>
                            Instead of manually configuring tables, pull our automated setup script from the Docker repository.
                            This setup container will validate connectivity to Hasura and PostgreSQL, apply required metadata and configuration for WebVox, and initialize JWT and related security settings.
                        </p>

                        <div className="code-block">
                            <code>docker run --env-file .env webvox/setup:latest</code>
                        </div>

                        <p>Monitor the container logs to ensure the process completes successfully.</p>

                        <div className="tip-box" style={{ marginTop: '1.5rem' }}>
                            <strong>.env requirement</strong>
                            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                                Create a <code>.env</code> file in your current directory with these variables before running the container:
                            </p>
                            <pre className="env-code">
                                {`# HASURA CONFIGURATION
HASURA_ENDPOINT=https://your-project.hasura.app
HASURA_ADMIN_SECRET=your_admin_secret

# DATABASE
DATABASE_URL=database://user:password@host:5432/dbname

# JWT CONFIGURATION
JWT_SECRET_KEY=your_jwt_secret
JWT_ALGO=HS256
TOKEN_EXPIRY_DAYS=365`}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>

            <div className="doc-footer-nav">
                <div className="nav-empty"></div>
                <Link to="/docs/embed-chatbot" className="nav-next">
                    <span>Next Step</span>
                    <strong>Embed WebVox Bot &rarr;</strong>
                </Link>
            </div>
        </div>
    );
};

export default SetupHasura;