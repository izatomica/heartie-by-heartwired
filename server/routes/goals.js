import express from 'express';
import pool from '../db.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// ====================================
// WEEKLY GOALS
// ====================================

router.get('/weekly', async (req, res) => {
  try {
    const { weekStartDate } = req.query;

    let query = 'SELECT * FROM weekly_goals WHERE user_id = $1';
    const params = [req.userId];

    if (weekStartDate) {
      query += ' AND week_start_date = $2';
      params.push(weekStartDate);
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);

    res.json(result.rows.map(row => ({
      id: row.id,
      userId: row.user_id,
      weekStartDate: row.week_start_date,
      category: row.category,
      goalText: row.goal_text,
      complete: row.complete,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    })));
  } catch (error) {
    console.error('Get weekly goals error:', error);
    res.status(500).json({ error: 'Failed to fetch weekly goals' });
  }
});

router.post('/weekly', async (req, res) => {
  try {
    const { weekStartDate, category, goalText, complete } = req.body;

    if (!weekStartDate || !category || !goalText) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await pool.query(
      `INSERT INTO weekly_goals (user_id, week_start_date, category, goal_text, complete)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [req.userId, weekStartDate, category, goalText, complete || false]
    );

    const goal = result.rows[0];

    res.status(201).json({
      id: goal.id,
      userId: goal.user_id,
      weekStartDate: goal.week_start_date,
      category: goal.category,
      goalText: goal.goal_text,
      complete: goal.complete,
      createdAt: goal.created_at,
      updatedAt: goal.updated_at
    });
  } catch (error) {
    console.error('Create weekly goal error:', error);
    res.status(500).json({ error: 'Failed to create weekly goal' });
  }
});

router.put('/weekly/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { complete, goalText } = req.body;

    const result = await pool.query(
      `UPDATE weekly_goals
       SET complete = COALESCE($1, complete), goal_text = COALESCE($2, goal_text)
       WHERE id = $3 AND user_id = $4
       RETURNING *`,
      [complete, goalText, id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Weekly goal not found' });
    }

    const goal = result.rows[0];

    res.json({
      id: goal.id,
      userId: goal.user_id,
      weekStartDate: goal.week_start_date,
      category: goal.category,
      goalText: goal.goal_text,
      complete: goal.complete,
      createdAt: goal.created_at,
      updatedAt: goal.updated_at
    });
  } catch (error) {
    console.error('Update weekly goal error:', error);
    res.status(500).json({ error: 'Failed to update weekly goal' });
  }
});

// ====================================
// ANNUAL GOALS
// ====================================

router.get('/annual', async (req, res) => {
  try {
    const { year } = req.query;

    let query = 'SELECT * FROM annual_goals WHERE user_id = $1';
    const params = [req.userId];

    if (year) {
      query += ' AND year = $2';
      params.push(year);
    }

    query += ' ORDER BY year DESC, category';

    const result = await pool.query(query, params);

    res.json(result.rows.map(row => ({
      id: row.id,
      userId: row.user_id,
      year: row.year,
      category: row.category,
      targetValue: parseFloat(row.target_value),
      currentValue: parseFloat(row.current_value),
      unit: row.unit,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    })));
  } catch (error) {
    console.error('Get annual goals error:', error);
    res.status(500).json({ error: 'Failed to fetch annual goals' });
  }
});

router.post('/annual', async (req, res) => {
  try {
    const { year, category, targetValue, currentValue, unit } = req.body;

    if (!year || !category || !targetValue || !unit) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await pool.query(
      `INSERT INTO annual_goals (user_id, year, category, target_value, current_value, unit)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (user_id, year, category)
       DO UPDATE SET target_value = $4, current_value = $5, unit = $6
       RETURNING *`,
      [req.userId, year, category, targetValue, currentValue || 0, unit]
    );

    const goal = result.rows[0];

    res.status(201).json({
      id: goal.id,
      userId: goal.user_id,
      year: goal.year,
      category: goal.category,
      targetValue: parseFloat(goal.target_value),
      currentValue: parseFloat(goal.current_value),
      unit: goal.unit,
      createdAt: goal.created_at,
      updatedAt: goal.updated_at
    });
  } catch (error) {
    console.error('Create annual goal error:', error);
    res.status(500).json({ error: 'Failed to create annual goal' });
  }
});

// ====================================
// QUARTERLY GOALS
// ====================================

router.get('/quarterly', async (req, res) => {
  try {
    const { year, quarter } = req.query;

    let query = 'SELECT * FROM quarterly_goals WHERE user_id = $1';
    const params = [req.userId];

    if (year) {
      query += ' AND year = $2';
      params.push(year);
    }

    if (quarter) {
      query += ` AND quarter = $${params.length + 1}`;
      params.push(quarter);
    }

    query += ' ORDER BY year DESC, quarter DESC';

    const result = await pool.query(query, params);

    res.json(result.rows.map(row => ({
      id: row.id,
      userId: row.user_id,
      year: row.year,
      quarter: row.quarter,
      theme: row.theme,
      keyInitiatives: row.key_initiatives,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    })));
  } catch (error) {
    console.error('Get quarterly goals error:', error);
    res.status(500).json({ error: 'Failed to fetch quarterly goals' });
  }
});

router.post('/quarterly', async (req, res) => {
  try {
    const { year, quarter, theme, keyInitiatives } = req.body;

    if (!year || !quarter) {
      return res.status(400).json({ error: 'Year and quarter are required' });
    }

    const result = await pool.query(
      `INSERT INTO quarterly_goals (user_id, year, quarter, theme, key_initiatives)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (user_id, year, quarter)
       DO UPDATE SET theme = $4, key_initiatives = $5
       RETURNING *`,
      [req.userId, year, quarter, theme, JSON.stringify(keyInitiatives)]
    );

    const goal = result.rows[0];

    res.status(201).json({
      id: goal.id,
      userId: goal.user_id,
      year: goal.year,
      quarter: goal.quarter,
      theme: goal.theme,
      keyInitiatives: goal.key_initiatives,
      createdAt: goal.created_at,
      updatedAt: goal.updated_at
    });
  } catch (error) {
    console.error('Create quarterly goal error:', error);
    res.status(500).json({ error: 'Failed to create quarterly goal' });
  }
});

export default router;
