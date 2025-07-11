#!/bin/bash
# Setup Git hooks for auto-sync with GitHub Actions fixes

echo "🔧 Setting up Git hooks for auto-sync..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Create .git/hooks directory if it doesn't exist
mkdir -p .git/hooks

# Create post-merge hook
cat > .git/hooks/post-merge << 'EOF'
#!/bin/bash
echo "🔄 Checking for GitHub Actions fixes..."

# Check if merge was from GitHub Actions
if git log -1 --pretty=%B | grep -q "fix: Auto-fix"; then
  echo "✅ GitHub Actions fixes detected and already merged"
fi

# Notify developer
echo "💡 Run 'git log -1' to see what was fixed"
EOF

# Create post-checkout hook for branch switches
cat > .git/hooks/post-checkout << 'EOF'
#!/bin/bash
PREV_COMMIT=$1
NEW_COMMIT=$2
BRANCH_SWITCH=$3

if [ "$BRANCH_SWITCH" = "1" ]; then
  echo "🔄 Checking for remote updates..."
  git fetch origin --quiet
  
  CURRENT_BRANCH=$(git branch --show-current)
  if [ -n "$CURRENT_BRANCH" ]; then
    LOCAL=$(git rev-parse HEAD)
    REMOTE=$(git rev-parse origin/$CURRENT_BRANCH 2>/dev/null || echo "")
    
    if [ -n "$REMOTE" ] && [ "$LOCAL" != "$REMOTE" ]; then
      echo "📥 Remote changes available on $CURRENT_BRANCH!"
      echo "   Run: git pull origin $CURRENT_BRANCH"
      
      # Show what changed
      echo ""
      echo "Changes:"
      git log --oneline HEAD..origin/$CURRENT_BRANCH 2>/dev/null || true
    fi
  fi
fi
EOF

# Create post-commit hook for reminder
cat > .git/hooks/post-commit << 'EOF'
#!/bin/bash
# Only show reminder for non-merge commits
if ! git rev-parse -q --verify MERGE_HEAD; then
  CURRENT_BRANCH=$(git branch --show-current)
  if [ "$CURRENT_BRANCH" = "test-main" ]; then
    echo ""
    echo "💡 Remember: Push to test-main to trigger validation & auto-merge"
    echo "   git push origin test-main"
  fi
fi
EOF

# Make hooks executable
chmod +x .git/hooks/post-merge
chmod +x .git/hooks/post-checkout
chmod +x .git/hooks/post-commit

echo -e "${GREEN}✅ Git hooks installed successfully!${NC}"
echo ""
echo -e "${BLUE}Installed hooks:${NC}"
echo "  • post-merge    : Notifies about GitHub Actions fixes"
echo "  • post-checkout : Alerts when remote has new changes"
echo "  • post-commit   : Reminds to push test-main for CI/CD"
echo ""
echo -e "${YELLOW}Note: These hooks are local to your repository${NC}"