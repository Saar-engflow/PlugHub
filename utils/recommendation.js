// utils/recommendation.js
// Simple scoring based on budget proximity, location match, category overlap
module.exports = function rankServices(services, request) {
  const reqBudget = request.budget || 0;
  const reqLocation = (request.location || '').toLowerCase();
  const reqCategories = new Set((request.preferences || request.categories || []).map(c => c.toLowerCase()));

  const scored = services.map(s => {
    // Average price
    const avg = (s.items && s.items.length)
      ? s.items.reduce((sum, i) => sum + (i.price || 0), 0) / s.items.length
      : 0;
    const budgetScore = avg > 0 ? 1 - Math.min(1, Math.abs(avg - reqBudget) / (reqBudget || avg || 1)) : 0.5;

    const locationScore = (s.serviceArea || '').toLowerCase() === reqLocation ? 1 : 0;

    const cats = new Set((s.categories || []).map(c => c.toLowerCase()));
    const overlap = [...cats].filter(c => reqCategories.has(c)).length;
    const categoryScore = cats.size ? overlap / cats.size : 0;

    const score = 0.5 * budgetScore + 0.3 * categoryScore + 0.2 * locationScore;
    return { service: s, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.map(s => s.service);
}
