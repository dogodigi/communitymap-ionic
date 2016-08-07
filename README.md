# communitymap-ionic

Overpass query to get the August Town Tour:
```
[out:json][timeout:25];
(
  node["ref"="august_town_tour"]({{bbox}});
  relation["ref"="august_town_tour"]({{bbox}});
);
out body;
>;
out skel qt;
```

First raw Gist for this query:
```
https://gist.githubusercontent.com/anonymous/da3e31c1a1d666a3a056d760ef3d1fbb/raw/8d5e1c3d692df86591180453e88aec9e6b82e05c/overpass.geojson
```

And

```
https://overpass-api.de/api/interpreter?data=%5Bout%3Ajson%5D%5Btimeout%3A25%5D%3B%0A%28%0A%20%20node%5B%22ref%22%3D%22august_town_tour%22%5D%2817.990274527259178%2C-76.74395442008972%2C17.994866398928075%2C-76.73263549804688%29%3B%0A%20%20relation%5B%22ref%22%3D%22august_town_tour%22%5D%2817.990274527259178%2C-76.74395442008972%2C17.994866398928075%2C-76.73263549804688%29%3B%0A%29%3B%0Aout%20body%3B%0A%3E%3B%0Aout%20skel%20qt%3B
```
