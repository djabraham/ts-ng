// These typescript definitions describe the structure of information
//   returned by elastisearch and were created for the benefit of typescript aware IDE

declare namespace Shared {

  export interface ISearchResults {
    code: number;
    data: ISearchResult[];
  }

  export interface ISearchResult {
    took: number;
    timed_out: boolean;
    _shards: {
      total: number;
      successful: number;
      failed: number;
    }
    hits: {
      total: number;
      max_score: number;
      hits: ISearchResultHit[];
    }
    aggregations: {
      top_authors: ISearchAggregate;
      count_by_type?: ISearchAggregate;
      top_labels?: ISearchAggregate;
    }
  }

  export interface ISearchAggregate {
    doc_count_error_upper_bound: number;
    sum_other_doc_count: number;
    buckets: ISearchResultBucket[];
  }

  export interface ISearchResultBucket {
    key: string;
    doc_count: number;
  }

  export interface ISearchResultHit {
    _index: string;
    _type: string;
    _id: string;
    _score: number;
    _source: ISearchResultTask; // | ISearchResultWish;
    highlight?: {
      description: string[];
    }
  }

  export interface ISearchResultTask {
    _id: string;
    description: string;
    forks: string[];
    labels: string[];
    minutes_saved: number;
    name: string;
    service: string;
    updated_at: string;
    uses: number;
    views: number;
    trending: number;
    addiction: number;
    public: boolean;
    authors: string[];
  }

  export interface ISearchResultWish {
    _id: string;
    referrer: string;
    description: string;
    author: string;
    __v: number;
    created: string;
    status: string;
    referer: string[];
    votes: number;
  }

}
