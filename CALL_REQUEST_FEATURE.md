# Call/Audio Request Notification System

## 🎯 Feature Overview

When another user sends you a request to interact via **call (video or audio)**, a beautiful **popup notification** appears on your screen immediately after you login. This allows you to quickly accept or reject teaching session requests.

---

## 📋 How It Works

### **Step 1: Login to Your Account**
1. Open `login.html`
2. Enter your email and password
3. Click **Login**
4. You're now logged in and the system is **automatically monitoring** for incoming call requests
   - ✅ A background listener is active (checks every 1 second)

### **Step 2: Another User Sends You a Teaching Request**

When **User A** wants to teach **User B**:

1. User A goes to **Session** section
2. Clicks **"Start Teaching (with Video)"** or **"Start Teaching (Audio Only)"**
3. Selects User B from the matched users list
4. Confirms the request

### **Step 3: You Receive the Popup Notification**

When User B is logged in and User A sends a request:

**The popup shows:**
- 📞 Large phone icon (animated)
- **"Incoming Call Request"** header
- 📩 **Sender's name/email**
- **Interaction Type**: Video Call or Audio Call
- **Skill Being Taught**: The specific skill for the session
- **Request Time**: Timestamp of when the request was sent
- ✓ **Accept Button** (green)
- ✕ **Reject Button** (red)
- ⏱ **Auto-close timer**: Request auto-closes after 30 seconds if not responded

---

## 🎮 User Actions

### **Accept Call Request**
1. Click the **✓ Accept** button
2. A confirmation message appears
3. The teaching session starts (Video or Audio depending on what was selected)

### **Reject Call Request**
1. Click the **✕ Reject** button
2. The request is marked as rejected
3. Popup closes immediately

### **Auto-Reject**
- If you don't respond within **30 seconds**, the request automatically closes

---

## 🔧 Technical Details

### Data Storage
- Call requests are stored in **localStorage** under key: `callRequests`
- Each request includes:
  - Unique ID
  - Requester's email and name
  - Recipient's email
  - Session type (video/audio)
  - Skill being taught
  - Timestamp
  - Response status

### Request Object Structure
```javascript
{
    id: "1234567890abc",                    // Unique identifier
    requesterEmail: "teacher@example.com",  // Who's sending the request
    requesterName: "Teacher Name",          // Display name
    recipientEmail: "student@example.com",  // Who's receiving
    type: "video",                          // "video" or "audio"
    skill: "JavaScript",                    // What they're teaching
    timestamp: 1690704000000,              // When request was sent
    responded: false,                       // Has user responded?
    status: "pending"                       // "pending", "accepted", "rejected"
}
```

### Notification System Flow
1. **Timer starts every 1 second** → `checkIncomingRequests()`
2. **Checks localStorage** for pending requests
3. **Filters** for requests matching current user's email
4. **Shows popup** if found
5. **Plays notification sound** (Web Audio API)
6. **Auto-dismisses** after 30 seconds
7. **Marks as responded** when user accepts/rejects

---

## 🎵 Notification Sound

- Uses **Web Audio API** to generate a beep tone
- Frequency: 800 Hz (sine wave)
- Duration: 0.5 seconds
- No external files needed
- Gracefully falls back if browser doesn't support Web Audio API

---

## 🧪 Testing the Feature

### **Test Scenario: Two Users**

#### **Setup**
1. Open `login.html` in one browser tab (User A)
2. Open `login.html` in another tab/private window (User B)

#### **Test Steps**

**User A (Requester):**
1. Register: `teacher@test.com` / `password123`
2. Login
3. Go to **Profile** → Fill in profile details
4. Go to **Skills**:
   - Add Skill to offer: "JavaScript"
   - Add Skill to learn: "Python"
   - Save
5. Go to **Session** → Click **"Start Teaching (Audio Only)"**
6. Select "student@test.com" from list
7. Click **Start**

**User B (Recipient):**
1. Register: `student@test.com` / `password123`
2. Login
3. Go to **Profile** → Fill in profile details
4. Go to **Skills**:
   - Add Skill to offer: "Python"
   - Add Skill to learn: "JavaScript"
   - Save
5. **Stay on any page** (notification automatically appears)
6. **Popup appears!** 📞
   - Shows: "📩 From: teacher@test.com"
   - Type: "Audio Call"
   - Skill: "JavaScript"
7. Click **✓ Accept** or **✕ Reject**

---

## ✨ Features

### **Popup Design**
- ✅ Beautiful gradient background (dark purple theme)
- ✅ Green accent border (indicates incoming call)
- ✅ Animated phone emoji (pulse effect)
- ✅ Smooth slide-in animation
- ✅ Responsive design (works on all devices)
- ✅ Dark overlay background for focus

### **User Experience**
- ✅ Clear visual hierarchy
- ✅ Easy-to-understand buttons
- ✅ Automatic sound notification
- ✅ Timer display for auto-close
- ✅ Works in background (continuous polling)
- ✅ No page refresh needed

### **Accessibility**
- ✅ Clear labels
- ✅ High contrast colors
- ✅ Buttons are large and easy to click
- ✅ Text is readable against background

---

## 🚀 Beyond Basic Implementation

### **Possible Future Enhancements**
1. **Browser Notifications**: Use Notification API for desktop alerts
2. **Multiple Requests**: Queue multiple incoming requests
3. **Request History**: Show past accepted/rejected requests
4. **Custom Sounds**: Let users choose notification sounds
5. **Screen Sharing**: Add screen share option with video/audio
6. **Actual WebRTC**: Implement real video/audio streaming
7. **Server Integration**: Move data storage to server for persistence
8. **Calendar Integration**: Schedule sessions in advance

---

## 📱 Mobile Responsiveness

The popup is designed to work on mobile devices:
- Touch-friendly button sizes
- Responsive width (90% on small screens)
- Proper font sizing for visibility
- Works with mobile browsers

---

## ⚙️ JavaScript Functions Reference

### **Main Functions**

| Function | Purpose |
|----------|---------|
| `checkIncomingRequests()` | Polls for pending requests |
| `showIncomingRequestPopup(request)` | Displays the notification popup |
| `hideIncomingRequestPopup()` | Closes the popup |
| `acceptCallRequest()` | User accepts the call request |
| `rejectCallRequest()` | User rejects the call request |
| `sendCallRequest(email, type, skill)` | Sends request to another user |
| `playNotificationSound()` | Plays the notification beep |
| `initializeRequestNotifications()` | Starts the monitoring system |

---

## 📝 Notes

- Requests are stored **locally** in localStorage (not on a server)
- In a production app, you'd want to move this to a **backend server** for persistence
- Current implementation uses **polling** (checks every 1 second)
- For real-time updates, consider using **WebSockets** in production
- The notification stays even if user navigates between sections

---

## 🐛 Troubleshooting

### **Popup doesn't appear**
- ✅ Make sure both users are logged in
- ✅ First user must send a request
- ✅ Second user's browser should show popup (check console)
- ✅ Check localStorage in browser dev tools

### **Notification sound doesn't play**
- ✅ Browser might block audio
- ✅ Check browser permissions
- ✅ Some browsers require user interaction first
- ✅ Check browser console for errors

### **Popup auto-closes too quickly**
- ✅ Set timeout longer (currently 30 seconds)
- ✅ Edit `incomingRequestTimeout` value

---

## 💡 Tips

1. **Test with two browser windows**: Open dashboard in two windows side-by-side
2. **Use Private Window**: Open one in private/incognito mode to avoid sharing cookies
3. **Watch Console**: Open dev tools (F12) to see logs
4. **Check Storage**: Open DevTools → Application → Local Storage to see requests
5. **Clear History**: Clear local storage before testing if having issues

---

Enjoy your new **Call/Audio Request Notification System**! 🎉
