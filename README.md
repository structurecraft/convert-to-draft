# Convert PR to Draft
Convert a pull request to draft

### Input Options

#### `repo-token`
**Required** Follow https://docs.github.com/en/graphql/guides/forming-calls-with-graphql#authenticating-with-graphql to generate access token. At a minimum it should have pullrequest read/write access.

#### `pr-key`
**Required** The pull request to convert to draft

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
          pr-key: 645
```

