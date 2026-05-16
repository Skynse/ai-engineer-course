# Data Models

**Video**: 1 min — What a data model is and the three our app uses

---

A **data model** defines the shape of one type of thing in your app — what fields it has and what type each field holds. This site has three.


### Posts

| Field | Type | Notes |
|-------|------|-------|
| title | string | Required |
| content | string | The post body |
| authorId | string | Links to the user |
| authorName | string | Display name |
| voteCount | integer | Starts at 0 |
| createdAt | datetime | Auto |

### Comments

| Field | Type | Notes |
|-------|------|-------|
| postId | string | Which post this belongs to |
| content | string | The comment body |
| authorId | string | Links to the user |
| authorName | string | Display name |
| createdAt | datetime | Auto |

### Users (Auth + Profile)

| Field | Type | Notes |
|-------|------|-------|
| userId | string | Appwrite account ID |
| displayName | string | Shown on posts |
| bio | string | Optional |
| createdAt | datetime | Auto |

Posts have many comments. Comments belong to one post. Users own their posts and comments — linked by `authorId`.
