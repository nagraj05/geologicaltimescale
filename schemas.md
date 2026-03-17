CREATE TABLE geological_units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- root, eon, era, period, epoch
  parent_id UUID REFERENCES geological_units(id),
  start_mya FLOAT,
  end_mya FLOAT,
  description TEXT,
  color TEXT,
  order_index INT
);

WITH earth AS (
  INSERT INTO geological_units (name, type, start_mya, end_mya, description, color, order_index)
  VALUES ('Earth', 'root', 4600, 0, 'Formation of Earth to present', '#4CAF50', 0)
  RETURNING id
)
SELECT * FROM earth;

WITH earth AS (
  SELECT id FROM geological_units WHERE name = 'Earth'
),
eons AS (
  INSERT INTO geological_units (name, type, parent_id, start_mya, end_mya, color, order_index)
  VALUES
    ('Hadean', 'eon', (SELECT id FROM earth), 4600, 4000, '#9E9E9E', 1),
    ('Archean', 'eon', (SELECT id FROM earth), 4000, 2500, '#795548', 2),
    ('Proterozoic', 'eon', (SELECT id FROM earth), 2500, 541, '#3F51B5', 3),
    ('Phanerozoic', 'eon', (SELECT id FROM earth), 541, 0, '#2196F3', 4)
  RETURNING id, name
)
SELECT * FROM eons;

WITH eons AS (
  SELECT id, name FROM geological_units WHERE type = 'eon'
)
INSERT INTO geological_units (name, type, parent_id, start_mya, end_mya, color, order_index)
VALUES
-- Phanerozoic
('Paleozoic', 'era', (SELECT id FROM eons WHERE name='Phanerozoic'), 541, 252, '#8BC34A', 1),
('Mesozoic', 'era', (SELECT id FROM eons WHERE name='Phanerozoic'), 252, 66, '#FF9800', 2),
('Cenozoic', 'era', (SELECT id FROM eons WHERE name='Phanerozoic'), 66, 0, '#F44336', 3);

WITH eras AS (
  SELECT id, name FROM geological_units WHERE type = 'era'
)
INSERT INTO geological_units (name, type, parent_id, start_mya, end_mya, color, order_index)
VALUES
-- Paleozoic
('Cambrian', 'period', (SELECT id FROM eras WHERE name='Paleozoic'), 541, 485, '#00BCD4', 1),
('Ordovician', 'period', (SELECT id FROM eras WHERE name='Paleozoic'), 485, 444, '#009688', 2),
('Silurian', 'period', (SELECT id FROM eras WHERE name='Paleozoic'), 444, 419, '#4CAF50', 3),
('Devonian', 'period', (SELECT id FROM eras WHERE name='Paleozoic'), 419, 359, '#8BC34A', 4),
('Carboniferous', 'period', (SELECT id FROM eras WHERE name='Paleozoic'), 359, 299, '#CDDC39', 5),
('Permian', 'period', (SELECT id FROM eras WHERE name='Paleozoic'), 299, 252, '#FFC107', 6),

-- Mesozoic
('Triassic', 'period', (SELECT id FROM eras WHERE name='Mesozoic'), 252, 201, '#FF5722', 1),
('Jurassic', 'period', (SELECT id FROM eras WHERE name='Mesozoic'), 201, 145, '#FF9800', 2),
('Cretaceous', 'period', (SELECT id FROM eras WHERE name='Mesozoic'), 145, 66, '#FFEB3B', 3),

-- Cenozoic
('Paleogene', 'period', (SELECT id FROM eras WHERE name='Cenozoic'), 66, 23, '#E91E63', 1),
('Neogene', 'period', (SELECT id FROM eras WHERE name='Cenozoic'), 23, 2.6, '#9C27B0', 2),
('Quaternary', 'period', (SELECT id FROM eras WHERE name='Cenozoic'), 2.6, 0, '#673AB7', 3);

WITH periods AS (
  SELECT id, name FROM geological_units WHERE type = 'period'
)
INSERT INTO geological_units (name, type, parent_id, start_mya, end_mya, color, order_index)
VALUES
-- Paleogene
('Paleocene', 'epoch', (SELECT id FROM periods WHERE name='Paleogene'), 66, 56, '#F06292', 1),
('Eocene', 'epoch', (SELECT id FROM periods WHERE name='Paleogene'), 56, 33.9, '#EC407A', 2),
('Oligocene', 'epoch', (SELECT id FROM periods WHERE name='Paleogene'), 33.9, 23, '#D81B60', 3),

-- Neogene
('Miocene', 'epoch', (SELECT id FROM periods WHERE name='Neogene'), 23, 5.3, '#BA68C8', 1),
('Pliocene', 'epoch', (SELECT id FROM periods WHERE name='Neogene'), 5.3, 2.6, '#AB47BC', 2),

-- Quaternary
('Pleistocene', 'epoch', (SELECT id FROM periods WHERE name='Quaternary'), 2.6, 0.0117, '#7E57C2', 1),
('Holocene', 'epoch', (SELECT id FROM periods WHERE name='Quaternary'), 0.0117, 0, '#5E35B1', 2);

