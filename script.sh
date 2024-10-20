echo "Starting frontend..."
cd frontend
npm install
npm run dev &  

echo "Starting backend..."
cd ../backend
npm install
node index.js &  

wait