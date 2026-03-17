🧾 Product Requirements Document (PRD)
1. 🧠 Product Overview

Name ideas:

ChronoEarth

GeoFlow

DeepTime Explorer

TimeLayers

Goal:
An interactive visualization of the Geological Time Scale where users explore:

🌍 Earth → Eons → Eras → Periods → Epochs

Using a node-based flow UI (React Flow).

2. 🎯 Target Users

Students (school/college)

Educators

Curious learners

You (personal tool)

3. ✨ Core Features
3.1 Interactive Tree Navigation

Start with a single node: Earth

On click → expands to Eons

Click Eon → expands to Eras

Click Era → expands to Periods

Click Period → expands to Epochs

👉 This is basically a lazy-loaded hierarchical graph

3.2 Node Details Panel

When clicking a node:

Name

Time range (e.g., 541–252 MYA)

Description

Key events

Images (optional)

3.3 Expand / Collapse

Expand children

Collapse subtree

3.4 Timeline Mode (optional V2)

Horizontal timeline view

Zoomable

3.5 Search

Search “Jurassic” → zoom + highlight

3.6 Save State (optional)

Remember last explored node

4. 🧩 Functional Requirements
Graph Behavior

Nodes are created dynamically

Edges connect parent → child

Layout: vertical or horizontal

Data Flow

Fetch children only when node is clicked

Avoid loading full dataset initially

5. 🏗️ Tech Stack

Frontend: Next.js + React Flow

UI: Tailwind + shadcn

DB: Neon (Postgres)

ORM: Drizzle / Prisma

Auth (optional): Clerk

Data fetching: TanStack Query

🗄️ Database Design (Neon DB)

You need a self-referencing hierarchical table

Option 1 (Best): Single Table Tree
CREATE TABLE geological_units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- eon, era, period, epoch
  parent_id UUID REFERENCES geological_units(id),
  start_mya FLOAT, -- million years ago
  end_mya FLOAT,
  description TEXT,
  color TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
🌳 Example Data
id	name	type	parent_id
1	Earth	root	null
2	Phanerozoic	eon	1
3	Mesozoic	era	2
4	Jurassic	period	3
🔥 Why this design?

Flexible hierarchy

Easy querying

Works perfectly with React Flow

📡 API Design (Next.js)
Get Children
GET /api/units?parentId=xyz

Response:

[
  {
    "id": "2",
    "name": "Phanerozoic",
    "type": "eon"
  }
]
Get Node Details
GET /api/unit/:id
⚛️ Frontend Architecture
React Flow State
nodes: Node[]
edges: Edge[]
Node Click Logic
const onNodeClick = async (node) => {
  const children = await fetch(`/api/units?parentId=${node.id}`)

  const newNodes = children.map(child => ({
    id: child.id,
    data: { label: child.name },
    position: calculatePosition(node),
  }))

  const newEdges = children.map(child => ({
    id: `${node.id}-${child.id}`,
    source: node.id,
    target: child.id,
  }))

  setNodes(prev => [...prev, ...newNodes])
  setEdges(prev => [...prev, ...newEdges])
}
Layout Strategy

Use:

dagre (auto layout) OR

Custom spacing (simpler)

🎨 UI Components
Node Types

Earth node (special)

Eon node

Era node

Period node

👉 Different colors per type

Side Panel

Appears on node click

Shows details

⚡ Performance Strategy

Lazy load children

Cache responses (TanStack Query)

Prevent duplicate nodes

🧠 Advanced Features (V2)

Time scale proportional spacing

Animations on expand

Zoom-based filtering

“Play through time” animation

🧪 Sample Seed Data
INSERT INTO geological_units (name, type, parent_id)
VALUES ('Earth', 'root', NULL);

INSERT INTO geological_units (name, type, parent_id)
VALUES ('Phanerozoic', 'eon', '<earth_id>');