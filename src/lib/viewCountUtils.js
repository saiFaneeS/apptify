// Generate a unique ID
function generateUniqueId() {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${timestamp}-${randomStr}`;
}

// Generate or retrieve a unique visitor ID
function getVisitorId() {
  if (typeof window !== "undefined") {
    let visitorId = localStorage.getItem("visitorId");
    if (!visitorId) {
      visitorId = generateUniqueId();
      localStorage.setItem("visitorId", visitorId);
    }
    return visitorId;
  }
  return null;
}

// Get the last view time for a specific post and visitor
function getLastViewTime(postId, visitorId) {
  if (typeof window !== "undefined") {
    const viewTimes = JSON.parse(localStorage.getItem("viewTimes") || "{}");
    return viewTimes[`${postId}_${visitorId}`] || null;
  }
  return null;
}

// Set the last view time for a specific post and visitor
function setLastViewTime(postId, visitorId, timestamp) {
  if (typeof window !== "undefined") {
    const viewTimes = JSON.parse(localStorage.getItem("viewTimes") || "{}");
    viewTimes[`${postId}_${visitorId}`] = timestamp;
    localStorage.setItem("viewTimes", JSON.stringify(viewTimes));
  }
}

// Check if enough time has passed since the last view
function shouldIncrementView(postId, visitorId) {
  const lastViewTime = getLastViewTime(postId, visitorId);
  return !lastViewTime || Date.now() - lastViewTime > 30 * 60 * 1000; // 30 minutes
}

export { getVisitorId, getLastViewTime, setLastViewTime, shouldIncrementView };
