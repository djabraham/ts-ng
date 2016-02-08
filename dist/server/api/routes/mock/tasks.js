"use strict";
exports.Tasks = {
    "code": 200,
    "data": [
        {
            "took": 16,
            "timed_out": false,
            "_shards": {
                "total": 1,
                "successful": 1,
                "failed": 0
            },
            "hits": {
                "total": 4631,
                "max_score": 0.17898238,
                "hits": [
                    {
                        "_index": "bdb",
                        "_type": "tasks",
                        "_id": "515c480fb3515bcc16000003",
                        "_score": 0.17898238,
                        "_source": {
                            "_id": "515c480fb3515bcc16000003",
                            "description": "Extracts the the output of...",
                            "forks": [],
                            "labels": [
                                ":Nexus"
                            ],
                            "minutes_saved": 10,
                            "name": "extract_accounting_log",
                            "service": "python",
                            "updated_at": "2014-05-21T15:21:03.449Z",
                            "uses": 14,
                            "views": 40,
                            "trending": 0,
                            "addiction": 0,
                            "public": true,
                            "authors": [
                                "fmarabot"
                            ]
                        }
                    }
                ]
            },
            "aggregations": {
                "top_authors": {
                    "doc_count_error_upper_bound": 0,
                    "sum_other_doc_count": 5835,
                    "buckets": [
                        {
                            "key": "mamorten",
                            "doc_count": 417
                        },
                        {
                            "key": "jajohnst",
                            "doc_count": 328
                        },
                        {
                            "key": "jrode",
                            "doc_count": 187
                        }
                    ]
                },
                "count_by_type": {
                    "doc_count_error_upper_bound": 0,
                    "sum_other_doc_count": 0,
                    "buckets": [
                        {
                            "key": "tasks",
                            "doc_count": 4631
                        }
                    ]
                },
                "top_labels": {
                    "doc_count_error_upper_bound": 0,
                    "sum_other_doc_count": 6393,
                    "buckets": [
                        {
                            "key": "diagnostic_signature",
                            "doc_count": 1863
                        },
                        {
                            "key": "automation",
                            "doc_count": 847
                        },
                        {
                            "key": "ios",
                            "doc_count": 387
                        }
                    ]
                }
            }
        }
    ]
};
