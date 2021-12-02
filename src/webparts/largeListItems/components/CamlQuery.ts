export const qry_bizSegment: string = `
<View>
    <Query>
        <Where>
            <And>
                <And>
                    <Geq>
                        <FieldRef Name="ID"/>
                        <Value Type="Number">{{minid}}</Value>
                    </Geq>
                    <Lt>
                        <FieldRef Name="ID"/>
                        <Value Type="Number">{{maxid}}</Value>
                    </Lt>
                </And>
                <Eq>
                    <FieldRef Name="BizSegment"/>
                    <Value Type="Text">{{searchKey}}</Value>
                </Eq>
            </And>
        </Where>
        <OrderBy>
            <FieldRef Name="ID" Ascending='FALSE'/>
        </OrderBy>
    </Query>
</View>
`;
export const qry_segmentSearch: string = `
<View>
    <Query>
        <Where>            
            <Eq>
                <FieldRef Name="BizSegment"/>
                <Value Type="Choice">{{searchKey}}</Value>
            </Eq>
        </Where>
    </Query>
</View>
`;
export const qry_cifnoSearch: string = `
<View>
    <Query>
        <Where>            
            <Eq>
                <FieldRef Name="CIFNo"/>
                <Value Type="Text">{{cifno}}</Value>
            </Eq>
        </Where>
    </Query>
</View>
`;