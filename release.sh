# this message is logged by semantic-release when one of the commits found by dev-scripts should trigger a release
expected_release_message="The release type for the commit is"

echo "blockmatic/dev-scripts: Running semantic-release in --dry-run to see if we should trigger a lerna release."
yarn dev-scripts release --dry-run | grep "${expected_release_message}"

if [ $? -eq 0 ]
then
  echo "blockmatic/dev-scripts: A release will be triggered."
  echo "blockmatic/dev-scripts: Configuring git for Github Actions Lerna publish..."
  git config --global user.email "no-reply@blockmatic.com"
  git config --global user.name "GitHub Action"
  git remote set-url origin "https://${GH_USERNAME}:${GH_TOKEN}@github.com/blockmatic/dev-scripts.git"
  git checkout master
  echo "blockmatic/dev-scripts: Configuring yarn for Github Actions Lerna publish..."
  yarn config set _authToken $NPM_TOKEN
  echo "blockmatic/dev-scripts: Attempting publish..."
  yarn lerna publish --yes --conventional-commits --registry=https://registry.npmjs.com
  exit $?
else
  echo "blockmatic/dev-scripts: No release will be triggered." >&2
  exit 0
fi
