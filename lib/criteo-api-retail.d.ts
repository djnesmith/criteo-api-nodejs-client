declare module 'criteo-api-retail';

interface MetaData {
    totalItemsAcrossAllPages: number,
    currentPageSize: number,
    currentPageIndex: number,
    totalPages: number,
    nextPage?: string
}

interface PageInfo {
    pageIndex: number,
    pageSize: number
}

interface AccountsResponse {
    data: [
        {
            id:string,
            type: string,
            attributes: {
                name: string
                type: string,
                subtype: string
                countries: [
                    string
                ],
                currency: string,
                parentAccountLabel: string,
                timeZone: string
            }
        }
    ],
    metadata: MetaData
}

interface CampaignsResponse {
    data: [
        {
            id: string,
            type: string,
            attributes: {
                accountId: string,
                promotedBrandIds: string[],
                budgetSpent: number,
                budgetRemaining: number,
                status: "active" | "inactive",
                createdAt: string,
                updatedAt: string,
                type?: "auction" | "preferred",
                drawableBalanceIds: string[],
                clickAttributionWindow: "7D" | "14D" | "30D",
                viewAttributionWindow: "none" | "1D" | "7D" | "14D" | "30D",
                name: string,
                budget: number | null
            }
        }
    ],
    metadata: MetaData
}

interface LineItemsResponse {
    data: [
        {
            id: string,
            type: string,
            attributes: {
                campaignId: string,
                budgetSpent: number,
                budgetRemaining: number | null,
                createdAt: string,
                updatedAt: string,
                targetRetailerId: string,
                status: "active" | "paused" | "scheduled" | "ended" | "budgetHit" | "noFunds" | "draft" | "archived",
                targetBid: number,
                isAutoDailyPacing: boolean,
                name: string,
                startDate: string,
                endDate?: string | null,
                maxBid: number | null,
                budget: number | null,
                monthlyPacing: number | null,
                dailyPacing: number | null,
                bidStrategy: "conversion" | "revenue" | "clicks"
            }
        }
    ],
    metadata: MetaData
}

interface ReportQuery {
    reportType: "summary" | "pageType" | "keyword" | "productCategory" | "product" | "attributedTransactions",
    startDate: string,
    endDate: string,
    timeZone: string,
    id: string,
    clickAttributionWindow: "7D" | "14D" | "30D",
    viewAttributionWindow: "none" | "1D" | "7D" | "14D" | "30D",
    format: "json-compact" | "json-newline" | "json" | "csv"
}

interface ReportStatusResponse {
    data: {
        type: "RetailMediaReportStatus",
        id: string,
        attributes: {
            status: "pending" | "success" | "failure" | "expired"
            rowCount: number,
            fileSizeBytes: number,
            md5Checksum: string,
            createdAt: string,
            expiresAt: string,
            message: string | null
        }
    }
}

declare class Criteo_API {
    constructor(key: string, secret: string);
    getAccounts(callback?:(err: any, res: any) => void): Promise<AccountsResponse | undefined>;
    getCampaignsByAccountId(accountId:string, pageInfo?:PageInfo, callback?:(err: any, res: any) => void): Promise<CampaignsResponse | undefined>;
    getLineItemsByCampaignId(campaignId:string, pageInfo?:PageInfo, callback?:(err: any, res: any) => void): Promise<LineItemsResponse | undefined>;
    getReport(reportType:"campaigns" | "line-items", query:ReportQuery, callback?:(err: any, res: any) => void): Promise<ReportStatusResponse | undefined>;
    getReportStatus(reportId:string, callback?:(err: any, res: any) => void): Promise<ReportStatusResponse | undefined>;
    getReportOutput(reportId:string, filepath?:string, callback?:(err: any, res: any) => void): Promise<ReportStatusResponse | undefined>;
}

