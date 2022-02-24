# Convert to Draft PRs
Convert open pull requests to draft

### Input Options

#### `repo-token`
**Required** Follow https://docs.github.com/en/graphql/guides/forming-calls-with-graphql#authenticating-with-graphql to generate access token. At a minimum it should have pullrequest read/write access.


### Example
```yaml
name: convert-to-draft

on:
  schedule:
    - cron: '0 0 * * *'

jobs:
  convert-to-draft:
    runs-on: ubuntu-latest
    steps:
      - uses: raviraipuria/convert-to-draft@v1.0.1
        with:
          repo-token: ${{ secrets.TOKEN }}
```

