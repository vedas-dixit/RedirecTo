from mangum import Mangum
from app.main import app  # Adjust if main app is elsewhere

handler = Mangum(app)