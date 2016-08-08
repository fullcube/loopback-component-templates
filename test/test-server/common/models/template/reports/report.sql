SELECT
  "Person"."firstName" AS "First Name",
  "Person"."lastName"  AS "Last Name",
  "Person"."email"     AS "Email"
FROM "Person"
WHERE "Person"."programId" = '{PROGRAM_ID}'
