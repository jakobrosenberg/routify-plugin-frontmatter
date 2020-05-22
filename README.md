### Usage

In your config or package.json insert

```json
  "routify": {
    "plugins":
      {
        "routify-plugin-frontmatter": {}
      }
  }
```

Frontmatter metadata can be found in ``meta.frontmatter`` of the respective file.

To change default extensions (md and svx)
``"routify-plugin-frontmatter": { "extensions": ["md"] }``


#### Note
This plugin does not strip frontmatter from your file. It only reads it and adds it to your metadata.