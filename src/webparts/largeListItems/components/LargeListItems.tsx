import * as React from 'react';
import { useEffect, FC } from 'react';
import styles from './LargeListItems.module.scss';
import { sp } from '@pnp/sp';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items/list';
import { IItem, Items, PagedItemCollection } from '@pnp/sp/items';
import * as HTMLDecoder from 'html-decoder';
import * as Handlebars from "handlebars";
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { IStackTokens } from 'office-ui-fabric-react';
import { qry_bizSegment, qry_cifnoSearch, qry_segmentSearch } from './CamlQuery';

export interface ILargeListItemsProps {
    description: string;
}

const containerStackTokens: IStackTokens = { childrenGap: 20 };

const pageSize: number = 2000;
const targetList: string = 'CIF Master';

const LargeListItems: FC<ILargeListItemsProps> = (props) => {

    const _getTemplateValue = (template: string, value: any): string => {
        const hTemplate = Handlebars.compile(HTMLDecoder.decode(template));
        return HTMLDecoder.decode(hTemplate(value));
    };

    /** Get All Items */
    const _allItemsClick = async () => {
        let filItems = await sp.web.lists.getByTitle(targetList).items.getAll();
        console.log("Get All Items: ", filItems);
    }

    /** PnP Paged Search */
    const _pnpPagedSearchClick = async () => {
        let finalItems: any[] = [];
        let items: PagedItemCollection<any[]> = undefined;
        do {
            if (!items) items = await sp.web.lists.getByTitle(targetList).items.top(2000).getPaged();
            else items = await items.getNext();
            if (items.results.length > 0) {
                finalItems = finalItems.concat(items.results);
            }
        } while (items.hasNext);
        console.log("PnP Paged All Items: ", finalItems);
    };

    /** PnP Paged Search with Segment */
    const _pnpPagedSearchSegmentClick = async () => {
        let finalItems: any[] = [];
        let items: PagedItemCollection<any[]> = undefined;
        do {
            if (!items) items = await sp.web.lists.getByTitle(targetList).items.top(2000).filter(`BizSegment eq 'GC'`).getPaged();
            else items = await items.getNext();
            if (items.results.length > 0) {
                finalItems = finalItems.concat(items.results);
            }
        } while (items.hasNext);
        console.log("PnP Paged Search with Segment: ", finalItems);
    };

    /** CIF Normal Search */
    const _normalSearchClick = async () => {
        let filItems = await await sp.web.lists.getByTitle(targetList).items.select('ID')
            .filter(`CIFNo eq '11606111'`).get();
        console.log("PnP Filter with CIF No: ", filItems);
    };

    /** CIF CAML Query Search */
    const _camlQuerySearchCIFNo = async () => {
        let camlQuery: string = _getTemplateValue(qry_cifnoSearch, { cifno: '11606111' });
        let filItems = await sp.web.lists.getByTitle(targetList).getItemsByCAMLQuery({
            ViewXml: camlQuery
        });
        console.log("CAML Query filter with CIF No: ", filItems);
    };

    /** PnP Filter with Segment */
    const _normalSegmentSearchClick = async () => {
        let filItems = await sp.web.lists.getByTitle(targetList).items.select('ID')
            .filter(`BizSegment eq 'GC'`).get();
        console.log("PnP Filter with Segment: ", filItems);
    };

    /** CAML Query filter with Segment */
    const _camlQuerySegmentSearchClick = async () => {
        let camlQuery: string = _getTemplateValue(qry_segmentSearch, { searchKey: 'GC' });
        let filItems = await sp.web.lists.getByTitle(targetList).getItemsByCAMLQuery({
            ViewXml: camlQuery
        });
        console.log("Caml Query filter with Segment: ", filItems);
    };

    /** Normalized CAML Query search with Segment */
    const _getMaxIdForList = async (listname: string): Promise<number> => {
        let maxItems: any[] = await sp.web.lists.getByTitle(listname).items
            .select('ID')
            .orderBy('ID', false)
            .top(1)
            .get();
        if (maxItems.length > 0) return maxItems[0].ID;
        else return 0;
    };

    const _searchLargeList = async (itemsQuery: string, searchKey: string): Promise<IItem[]> => {
        let minid: number;
        let maxid: number;
        let listmaxid: number = await _getMaxIdForList(targetList);
        let maxPage: number = Math.ceil(listmaxid / pageSize);
        let returnItems = [];
        for (var i = 0; i < maxPage; i++) {
            minid = i * pageSize + 1;
            maxid = (i + 1) * pageSize;
            console.log(`Min id: ${minid.toString()} - Max Id: ${maxid.toString()}`);
            let camlQuery: string = _getTemplateValue(itemsQuery, { searchKey: searchKey, minid: minid, maxid: maxid });
            let retitems: IItem[] = await sp.web.lists.getByTitle(targetList).getItemsByCAMLQuery({
                ViewXml: camlQuery
            });
            if (retitems.length > 0) {
                returnItems = returnItems.concat(retitems);
            }
            if (i >= maxPage - 1) return returnItems;
        }
        return returnItems;
    };

    const _normCamlQuerySegmentSearchClick = async () => {
        let filItems = await _searchLargeList(qry_bizSegment, 'GC');
        console.log("Normalized Caml Query filter with Segment: ", filItems);
    };

    return (
        <div className={styles.largeListItems}>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <Stack horizontal horizontalAlign={'start'} tokens={containerStackTokens} wrap>
                            <Stack.Item>
                                <PrimaryButton text="Get All Items" onClick={_allItemsClick} />
                            </Stack.Item>
                            <Stack.Item>
                                <PrimaryButton text="PnP Paged All Items" onClick={_pnpPagedSearchClick} />
                            </Stack.Item>
                            <Stack.Item>
                                <PrimaryButton text="PnP Paged Search with Segment" onClick={_pnpPagedSearchSegmentClick} />
                            </Stack.Item>
                            <Stack.Item>
                                <PrimaryButton text="PnP Filter with CIF No" onClick={_normalSearchClick} />
                            </Stack.Item>
                            <Stack.Item>
                                <PrimaryButton text="CAML Query filter with CIF No" onClick={_camlQuerySearchCIFNo} />
                            </Stack.Item>
                            <Stack.Item>
                                <PrimaryButton text="PnP Filter with Segment" onClick={_normalSegmentSearchClick} />
                            </Stack.Item>
                            <Stack.Item>
                                <PrimaryButton text="Caml Query filter with Segment" onClick={_camlQuerySegmentSearchClick} />
                            </Stack.Item>
                            <Stack.Item>
                                <PrimaryButton text="Normalized Caml Query filter with Segment" onClick={_normCamlQuerySegmentSearchClick} />
                            </Stack.Item>
                        </Stack>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LargeListItems;