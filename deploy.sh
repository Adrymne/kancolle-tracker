meteor build ../open-shift/kctracker/ --directory --server-only
cd ../open-shift/kctracker
git add -A
git commit -am 'Server update.'
git push
