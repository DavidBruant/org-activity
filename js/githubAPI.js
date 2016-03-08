"use strict";

function orgRepos(org){
    return fetchMemoized([
        GITHUB_API_URL_PREFIX,
        'orgs',
        org,
        'repos'
    ].join('/'))
}

function repoEvents(repo, page){
    return fetchMemoized([
        GITHUB_API_URL_PREFIX,
        'repos',
        repo,
        'events'
    ].join('/') + '?page='+page)
}

function allRepoEvents(repo){
    return Promise.all(Array(10).fill()
        .map( (e, i) => i+1 )
        .map( page => repoEvents(repo, page) )
    )
    .then(flatten)
}