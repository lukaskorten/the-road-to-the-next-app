import { closest } from 'fastest-levenshtein';

export function getActivePath(
  path: string,
  paths: string[],
  ignorePaths?: string[]
) {
  const allPaths = paths.concat(ignorePaths || []);
  const closestPath = closest(path, allPaths);
  const activePathIndex = paths.indexOf(closestPath);

  return { active: closestPath, activeIndex: activePathIndex };
}
