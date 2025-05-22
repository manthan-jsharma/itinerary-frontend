Guide to Itinerary Creation and
Recommendation.

In this Tutorial i will Guide how and what kind of Backend Specific Operations i used to navigate
this Assessment.
First let Recap our Project file Structure that makes mind-mapping easier so we can deduce
resources and alignments faster(for an example if we get some error with our configurations we
can navigate to this map, get an insight how and where all the files and backend services are
interconnected, and Figure out an immediate resource for clearance)
1) Create a Database Config Setup
Models
Schemas
Database config
Relations
Then plan out what do we want to Achieve within this Database
We need Itinerary Creation and Recommendation.
For that we also need overlaying Data regarding the places, transfers, locations. So we need to
configure our Database with seeding
So Our Interconnected structure of Database Files will also include Seed file.
Final iteration :
Models
Schemas
Database config
Relations
Seed_Data
2) Dissect all the Itinerary Crud APIs
POST /itineraries/
GET /itineraries/
GET /itineraries/{itinerary_id}
POST /recommendations/
GET /recommendations/ All this APIs are specific to the Itinerary creation, which is related to our
Database, Schemas, Models, Relations and seeding.

3) Dissect out The Fast API service and MCP service.
Plan out the file config for both server and their ports
In my case i have written both of their configs in run.py, run them in different processes.
So they both Function for their specific usecases and can be imported and configured easily.
Now lets plan out the MCP SERVER CONFIG
1) Create a separate FASTAPI Server
2) RecommendationRequest from DB (NIghts, regions, budgets.)
MCP Part came out to be kind of Tricky for me, I have used AI help to Plan out me some
specific EdgeCases:
1) If no Itinarary found , try to find closest matches
2) If still not , try with budget constraints,
3) Region constraints
4) If still not then Return any Recommended itinerary, which was a GET API Already
Setup in our “2nd Step”
3) Run the MCP server on port 8001.
With this Setup our goal is to Call the MCP Specific API --> POST /recommend/

4) FInd out Necessary packages and resources for your setup:
Ex- Requirement.txt setup for this project :
fastapi==0.103.1
uvicorn==0.23.2
sqlalchemy==2.0.20
alembic==1.12.0
psycopg2-binary==2.9.7
python-dotenv==1.0.0
pydantic==2.3.0

HERE YOU CAN SEE, i also had to use alembic for this, Why do we need both Alembic
and SqlAlchemy ? I have written a medium article for this

https://medium.com/@manthan.jsharma/why-do-we-need-both-alembic-and-sqlalchemy-
8e6b895bc72b

With all these Navigational Planning and setup, now what you need to do is
follow these steps,
curate some of your own custom coding skills and logic, can expand on features
and just create a smooth looking frontend for this.
With this planning approach we are always alert regarding the
EdgeCases,
Service Expansion Criterias,
Practical Scalability and Logic Building
Even if you take help from AI, it will not affect much as long as you are having
understanding about how to integrate backend services, what can their
limitations be, what custom logic is being demanded from those limitations, how
scalable features will be created.
What matters the most is Constant Exposure, Resource Optimisation and a
kink to solve some Real-World Problems.
Important Links For Project:

1)Github Frontend: https://github.com/manthan-jsharma/itinerary-frontend
2)Github Backend: https://github.com/manthan-jsharma/itinerary-backend
3)Demo Video : https://www.loom.com/share/d3f3e78893f048ee8a5b753eb6fa5cec
4) Medium Article:
https://medium.com/@manthan.jsharma/why-do-we-need-both-alembic-and-sqlalchemy-8e6b89
5bc72b

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
