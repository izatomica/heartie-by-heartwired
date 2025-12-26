import express from 'express';
import pool from '../db.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get all activities for the authenticated user
router.get('/', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    let query = 'SELECT * FROM activities WHERE user_id = $1';
    const params = [req.userId];

    if (startDate && endDate) {
      query += ' AND date >= $2 AND date <= $3';
      params.push(startDate, endDate);
    }

    query += ' ORDER BY date DESC';

    const result = await pool.query(query, params);

    res.json(result.rows.map(row => ({
      id: row.id,
      userId: row.user_id,
      date: row.date,
      title: row.title,
      content: row.content,
      funnelStage: row.funnel_stage,
      platform: row.platform,
      contentPillar: row.content_pillar,
      status: row.status,
      linkedWeeklyGoalId: row.linked_weekly_goal_id,
      priorityQuadrant: row.priority_quadrant,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    })));
  } catch (error) {
    console.error('Get activities error:', error);
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

// Create a new activity
router.post('/', async (req, res) => {
  try {
    const {
      date,
      title,
      content,
      funnelStage,
      platform,
      contentPillar,
      status,
      linkedWeeklyGoalId,
      priorityQuadrant
    } = req.body;

    // Validate required fields
    if (!date || !title || !funnelStage || !platform) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await pool.query(
      `INSERT INTO activities
       (user_id, date, title, content, funnel_stage, platform, content_pillar, status, linked_weekly_goal_id, priority_quadrant)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING *`,
      [req.userId, date, title, content, funnelStage, platform, contentPillar, status || 'idea', linkedWeeklyGoalId, priorityQuadrant]
    );

    const activity = result.rows[0];

    res.status(201).json({
      id: activity.id,
      userId: activity.user_id,
      date: activity.date,
      title: activity.title,
      content: activity.content,
      funnelStage: activity.funnel_stage,
      platform: activity.platform,
      contentPillar: activity.content_pillar,
      status: activity.status,
      linkedWeeklyGoalId: activity.linked_weekly_goal_id,
      priorityQuadrant: activity.priority_quadrant,
      createdAt: activity.created_at,
      updatedAt: activity.updated_at
    });
  } catch (error) {
    console.error('Create activity error:', error);
    res.status(500).json({ error: 'Failed to create activity' });
  }
});

// Update an activity
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      date,
      title,
      content,
      funnelStage,
      platform,
      contentPillar,
      status,
      linkedWeeklyGoalId,
      priorityQuadrant
    } = req.body;

    // Check if activity belongs to user
    const checkResult = await pool.query(
      'SELECT id FROM activities WHERE id = $1 AND user_id = $2',
      [id, req.userId]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    const result = await pool.query(
      `UPDATE activities
       SET date = $1, title = $2, content = $3, funnel_stage = $4, platform = $5,
           content_pillar = $6, status = $7, linked_weekly_goal_id = $8, priority_quadrant = $9
       WHERE id = $10 AND user_id = $11
       RETURNING *`,
      [date, title, content, funnelStage, platform, contentPillar, status, linkedWeeklyGoalId, priorityQuadrant, id, req.userId]
    );

    const activity = result.rows[0];

    res.json({
      id: activity.id,
      userId: activity.user_id,
      date: activity.date,
      title: activity.title,
      content: activity.content,
      funnelStage: activity.funnel_stage,
      platform: activity.platform,
      contentPillar: activity.content_pillar,
      status: activity.status,
      linkedWeeklyGoalId: activity.linked_weekly_goal_id,
      priorityQuadrant: activity.priority_quadrant,
      createdAt: activity.created_at,
      updatedAt: activity.updated_at
    });
  } catch (error) {
    console.error('Update activity error:', error);
    res.status(500).json({ error: 'Failed to update activity' });
  }
});

// Delete an activity
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'DELETE FROM activities WHERE id = $1 AND user_id = $2 RETURNING id',
      [id, req.userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Activity not found' });
    }

    res.json({ message: 'Activity deleted successfully' });
  } catch (error) {
    console.error('Delete activity error:', error);
    res.status(500).json({ error: 'Failed to delete activity' });
  }
});

export default router;
