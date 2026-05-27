# Proof of Work: Customer Interaction Insights

**Role:** Senior AI & Backend Engineer  
**Organization:** Accenture Solutions  
**Clients:** Verizon & Wells Fargo  

---

## Key Impact Metrics
*   **+40%** Issue Resolution Speed (automated root-cause detection & alerts)
*   **-50%** End-to-End Data Ingestion Latency (optimized live pipelines)
*   **-80%** Local Memory Footprint (Google Cloud Embeddings vs. local CPU models)
*   **979** Automated Unit Tests Successfully Passing (production quality assurance)

---

## The Four Portfolio Elements

### Element 1 — What was the problem or brief?
Enterprise call centers for clients like Verizon and Wells Fargo process millions of customer calls daily, but extracting actionable insights—such as the exact root causes of customer frustration, compliance failures, and urgent callback intents—was a slow, manual process. Without a scalable, persistent automated system, critical customer escalations went unnoticed, leading to customer churn, high operational costs, and prolonged issue-resolution times. I was tasked with building a high-throughput, production-grade Generative AI pipeline to ingest call transcripts, perform granular conversational analysis, and deliver real-time prescriptive insights to business leaders.

### Element 2 — How did you approach it?
Instead of a monolithic LLM prompt that would suffer from accuracy degradation, I architected a modular multi-agent system using LangGraph with five specialized, parallel agents (Root Cause, Escalation, Sentiment, Action Items, and Quality Assurance). To deploy on resource-constrained hosting (Render's 512MB free tier), I switched from local HuggingFace embeddings to cloud-hosted Google Generative AI Embeddings (`models/text-embedding-004`), eliminating heavy PyTorch/Transformer dependencies to save over 400MB of RAM. Additionally, I designed a dual-storage scheme: using MongoDB Atlas for persistent call document records and ChromaDB for semantic vector retrieval.

### Element 3 — What did you actually do?
I implemented the FastAPI stateful backend and the live `/api/ingest` endpoint, which feeds incoming raw transcripts directly into the LangGraph pipeline and maps the output Pydantic schema into a dashboard-compatible call record. I built database adapters in Python utilizing `pymongo` to persist records on MongoDB Atlas, alongside a vector store service that embeds transcripts on the fly using the Google API. Finally, I replaced mock streaming with an active WebSocket broadcaster that pushes live-processed call updates directly to the React dashboard, and authored database migration and seeding scripts to ensure consistent startup states.

### Element 4 — What was the result?
The updated architecture successfully eliminated local CPU embedding constraints, cutting memory footprint by 80% to allow seamless, stable cloud deployment on Render within a 512MB limit. By introducing a persistent MongoDB Atlas layer, we achieved enterprise-grade data durability and scaled the platform to handle live, real-time incoming call ingestions rather than mock data streams. The resulting system now executes speech transcript extraction, agent scoring, MongoDB storage, vector embedding, and real-time dashboard updates via WebSockets in less than 5 seconds.

---

## Technical Stack & Architecture Summary
*   **Agentic Orchestration:** LangGraph (StateGraph with 5 Specialist Nodes + Aggregator Node)
*   **LLMs & Schema Enforcement:** GPT-4o, Llama 3 70B (vLLM self-hosted router), Instructor + Pydantic
*   **Vector Search & RAG:** ChromaDB, Google Generative AI Embeddings (`models/text-embedding-004`), LangChain
*   **Database & Persistence:** MongoDB Atlas (`pymongo` client integration)
*   **Ingestion & Backend:** FastAPI async service, live webhook ingest (`/api/ingest`)
*   **Observability & Security:** Microsoft Presidio (PII redaction), Keycloak (SSO), LangSmith / LangFuse (LLM Tracing)
*   **Frontend Dashboard:** React 18, TypeScript, Recharts, WebSocket (Real-time updates)
