import {
    Writer
} from 'protobufjs/minimal'
export enum RpcReturnCode {
    BEGIN = 0,
        UPDATEBLOCKLOCTION_SUCCESS = 10,
        BLOCKOPERATE_IDCANNOTUSE = -11,
        BLOCKSOPERATE_ARGNOTARRAY = -12,
        BLOCKOPERATE_ARGLACK = -13,
        BLOCKOPERATE_POSERR = -14,
        BLOCKOPERATE_NOTINBAG = -15,
        BLOCKOPERATE_NOBLOCK = -16,
        BLOCKOPERATE_WITHDRAWFUNCBUILD = -17,
        PLAYER_ALLBUILDING__ERR = -141,
        PLAYER_SINGLEBUILDING_ERR = -142,
        PLAYER_BUILDING_NOTIDLE = -143,
        BUILDINGFUNCTION_IDERR = -144,
        BUILDINGQUEUE_TYPE_ERR = -145,
        RAPIDFINISH_CONSUME_LACK = -146,
        BUILDING_NOQUEUE = -147,
        BUILD_HAS_PRODUCT = -148,
        NEWBUILD_CONSUME_LACKRES = -149,
        NEWBUILD_CONSUME_LACKITEM = -151,
        BUILDING_ARGERR = -152,
        NEWBUILD_SUCCESS = 150,
        DORESEARCH_SUCCESS = 70,
        DORESEARCH_TECHID_ERR = -71,
        DORESEARCH_LEVELMAX = -72,
        DORESEARCH_PRETECH_NEED = -73,
        DORESEARCH_TECHBUILDLVL_NEED = -74,
        DORESEARCH_CONSUMELACK = -75,
        PUBRECRUIT_SUCCESS = 80,
        PUBRECRUIT_CFGDATA_ERR = -81,
        PUBRECRUIT_FREE_MULTITIMES = -82,
        PUBRECRUIT_COMMON_FREE_USEUP = -83,
        PUBRECRUIT_COMMON_FREE_INCD = -84,
        PUBRECRUIT_GAIN_EMPTY = -85,
        PUBRECRUIT_HIGH_FREE_USEUP = -86,
        PUBRECRUIT_CONSUME_LACK = -87,
        SETNOTSHOWFLAG_SUCCESS = 90,
        ACCELERATEQUEUE_SUCCESS = 100,
        CANCELQUEUE_SUCCESS = 101,
        ACCELERATE_TIME_ERR = -101,
        GET_QUEUE_ERR = -102,
        ACCELERATE_ITEMID_ERR = -103,
        ACCELERATE_ITEM_QUEUETYPE_ERR = -104,
        ACCELERATE_CONSUME_LACK = -105,
        ACCELERATE_BUY_ITEM_FAIL = -106,
        TRAINSOLDIER_SUCCESS = 160,
        TRAINSOLDIER_ARGERR = -161,
        TRAINSOLDIER_CFGERR = -162,
        TRAINSOLDIER_TYPENOTMATCH = -163,
        TRAINSOLDIER_NUMOVERMAX = -164,
        TRAINSOLDIER_TECHNEED = -165,
        TRAINSOLDIER_CONSUMELACK = -166,
        BUILDLEVELUP_SUCCESS = 170,
        BUILDLEVELUP_LEVELMAX = -171,
        BUILDLEVELUP_PREBUILDLVLNEED = -172,
        BUILDLEVELUP_ITEMLACK = -173,
        BUILDLEVELUP_RESLACK = -174,
        BUILDLEVELUP_QUEUENUMLIMIT = -175,
        TREATWOUNDED_SUCCESS = 190,
        TREATWOUNDED_CONSUMELACK = -191,
        CHAT_PLAYERCHANNELS_ERR = -211,
        CHAT_SINGLECHANNEL_ERR = -212,
        CHAT_PLAYER_NOTINCHANNEL = -213,
        CHAT_GROUPNOTFIND = -214,
        CHAT_PLAYERNOTINGROUP = -215,
        CHAT_PLAYERINGROUP = -216,
        CHAT_DELBEFORECLEAR = -217,
        CHAT_OPAUTHORITYNEED = -218,
        CHAT_FRIENDSHIPNEED = -219,
        CHAT_PLAYERDBINFO_ERR = -220,
        CHAT_AIMPLAYERIDINVALID = -231,
        CHAT_AIMPLAYERNOTINGROUP = -232,
        CHAT_AIMPLAYERNOTINCHANNEL = -233,
        CHATENTRY_SUCCESS = 220,
        CHATENTRY_MAINLVLNEED = -222,
        CHATENTRY_INCD = -223,
        CHATENTRY_MSGLENOVERMAX = -224,
        CHATENTRY_PRIVATEBLOCKED = -225,
        CREATEGROUP_POSITIONNEED = -241,
        CREATEGROUP_GROUPNUMMAX = -242,
        CREATEGROUP_SELFMANAGENUMMAX = -243,
        CREATEGROUP_VOLUMEMAX = -244,
        CREATEGROUP_VOLUMEMIN = -245,
        OPGROUP_SUCCESS = 250,
        OPGROUP_DISIMISSDONE = 251,
        OPGROUP_JOINDONE = 252,
        OPGROUP_EXITDONE = 253,
        OPGROUP_NEEDCONFIRMEXIT = 254,
        OPGROUP_INVALIDOPTYPE = -251,
        OPGROUP_CANNOTJOIN = -252,
        OPGROUP_CANNOTKICK = -253,
        OPGROUP_MODIFYGNAMEDONE = 255,
        OPGROUP_SENSITIVEWORDS = -254,
        CHAT_SETFLAG_SUCCESS = 270,
        CHAT_SETPLAYERFLAG_SUCCESS = 280,
        CHAT_READNEWMSG_SUCCESS = 290,
        SETACTIVEMAINSKILL_SUCCESS = 300,
        SETACTIVEMAINSKILL_POSINVALID = -301,
        SETACTIVEMAINSKILL_IDINVALID = -302,
        SETACTIVEMAINSKILL_LOCKED = -303,
        CLICKGETREWARD_SUCCESS = 590,
        CLICKGETREWARD_CANNOT = -591,
        CLICKGETREWARD_NOTASK = -592,
        CLICKGETREWARD_PLAYERIDERR = -593,
        OPENACTIVEBOX_SUCCESS = 600,
        OPENACTIVEBOX_PLAYERIDERR = -601,
        OPENACTIVEBOX_LACKPOINT = -602,
        OPENACTIVEBOX_OPENEDBEFORE = -603,
        OPENACTIVEBOX_BOXINFOERR = -604,
        TASK_OPSUCCESS = 680,
        TASK_STATUSERR = -681,
        TASK_INFOERR = -682,
        PLAYERHEROES_DATA_ERR = -801,
        PLAYER_SINGLE_HERO_ERR = -802,
        PLAYER_HERO_ARGERR = -803,
        PLAYER_HERO_EXISTED = -804,
        PLAYER_EXISTHERO_CONVERT_DONE = 800,
        PLAYER_GET_HERO_DONE = 801,
        HERO_ADDEXP_EXPINVALID = -821,
        HERO_ADDEXP_LVLLIMIT = -822,
        HERO_ADDEXP_USEITEMFAIL = -823,
        HERO_ADDEXP_REACHLIMIT = 820,
        HERO_ADDEXP_SUCCESS = 821,
        HERO_INCSTAR_USEITEMFAIL = -831,
        HERO_INCSTAR_REACHLIMIT = -832,
        HERO_INCSTAR_SUCCESS = 830,
        HERO_SETMAINFIGHT_SUCCESS = 840,
        HERO_SETMAINFIGHT_ARGERR = -841,
        HERO_SKILLLEVELUP_SUCCESS = 1060,
        HERO_SKILLLEVELUP_LOCKED = -1061,
        HERO_SKILLLEVELUP_ITEMLACK = -1062,
        HERO_SKILLLEVELUP_MAXLEVEL = -1063,
        HERO_SKILLLEVELUP_CFGERR = -1064,
        NEWBIEGUIDE_SUCCESS = 1070,
        TURRET_RECOVERY_SUCCESS = 1080,
        TURRET_COMPOSE_SUCCESS = 1081,
        BUILDING_NOTTURRET = -1082,
        TURRET_COMPOSE_ARGERR = -1083,
        SAVE_BUILDING_SUCCESS = 1091,
        SAVE_BUILDING_ARGERR = -1092,
        CHANGE_BUILDING_SUCCESS = 1093,
        CHANGE_BUILDING_ARGERR = -1094,
        SET_EQUIP_SUCCESS = 1101,
        SET_EQUIP_ARGERR = -1102,
}
export enum CommonInfoChangeReason {
    CHANGEREASON_NONE = 0,
        TRAIN_ADD_SOLDIER = 1,
        STARTQUEUE_DEC_RES = 2,
        RAPIDFINISHQUEUE_DEC_RES = 3,
        ACCELERATEQUEUE_DEC_ITEM = 4,
        CANCELQUEUE_INC_RES = 5,
        BUILDROBBED_DEC_RES = 6,
        BUILDPRODUCT_INC_RES = 7,
        PUBRECRUIT_DEC_ITEM = 8,
        PUBRECRUIT_GAIN_ITEM = 9,
        STARTQUEUE_DEC_ITEM = 10,
        TASK_ADD_ITEM = 11,
        TASK_INC_RES = 12,
        TREAT_FINISH_CHANGE_SOLDIER = 13,
        GOLD_BUY_RESOURCE = 14,
        ADD_HERO_EXP_DEC_ITEM = 15,
        GM_ADD_SOLDIER = 16,
        NEWBUILDING_DEC_RES = 17,
        NEWBUILDING_DEC_ITEM = 18,
        BUY_ITEM_DEC_RES = 19,
        RES_BUY_INC_ITEM = 20,
        CANCELQUEUE_INC_ITEM = 21,
        INCHEROSTAGE_DEC_ITEM = 22,
        INCHEROSKILLLEVEL_DEC_ITEM = 23,
}
export enum Attribute_Type_Top {
    TYPE_NONE = 0,
        TYPE_BATTLE = 1,
        TYPE_BUILD = 2,
        TYPE_OTHER = 3,
}
export class Handshake {
    protoVersion ? : number
    static encode(msg: Handshake): Writer
    static decode(buf: Uint8Array): Handshake
}
export class ReturnMsg {
    code ? : number
    arg1 ? : number | Long
    static encode(msg: ReturnMsg): Writer
    static decode(buf: Uint8Array): ReturnMsg
}
export class ServerId {
    code ? : number
    sid ? : string
    static encode(msg: ServerId): Writer
    static decode(buf: Uint8Array): ServerId
}
export class LoginRet {
    code ? : number
    time ? : number | Long
    static encode(msg: LoginRet): Writer
    static decode(buf: Uint8Array): LoginRet
}
export class UserLoginInfo {
    account ? : string
    pwd ? : string
    static encode(msg: UserLoginInfo): Writer
    static decode(buf: Uint8Array): UserLoginInfo
}
export class UserEnterInfo {
    account ? : string
    roleId ? : number | Long
    token ? : string
    sid ? : string
    static encode(msg: UserEnterInfo): Writer
    static decode(buf: Uint8Array): UserEnterInfo
}
export class AttackData {
    troopId ? : number
    targetId ? : number
    static encode(msg: AttackData): Writer
    static decode(buf: Uint8Array): AttackData
}
export class ChatInfo {
    contend ? : string
    static encode(msg: ChatInfo): Writer
    static decode(buf: Uint8Array): ChatInfo
}
export class KeyValuePair {
    key ? : number
    value ? : number
    static encode(msg: KeyValuePair): Writer
    static decode(buf: Uint8Array): KeyValuePair
}
export class SimpleMsg {
    param ? : number
    static encode(msg: SimpleMsg): Writer
    static decode(buf: Uint8Array): SimpleMsg
}
export class ULongId {
    id ? : number | Long
    static encode(msg: ULongId): Writer
    static decode(buf: Uint8Array): ULongId
}
export class ULongIdList {
    ids ? : Array < number | Long >
        static encode(msg: ULongIdList): Writer
    static decode(buf: Uint8Array): ULongIdList
}
export class AttrInc {
    attrId ? : number
    value ? : number
    static encode(msg: AttrInc): Writer
    static decode(buf: Uint8Array): AttrInc
}
export class PlayerAttrsInc {
    playerId ? : number | Long
    incInfo ? : Array < AttrInc >
        static encode(msg: PlayerAttrsInc): Writer
    static decode(buf: Uint8Array): PlayerAttrsInc
}
export class PlayerBaseInfo {
    roleId ? : number | Long
    serverId ? : number
    accId ? : string
    roleName ? : string
    level ? : number
    food ? : number
    stone ? : number
    iron ? : number
    crystal ? : number
    gold ? : number
    actionToken ? : number
    combatEffect ? : PlayerCombatEffectInfo
    tradelevel ? : number
    tradegold ? : number
    nearportId ? : number
    summontime ? : number | Long
    killmonsterlevel ? : number
    killoutpostlevel ? : number
    tili ? : number
    unionjob ? : number
    uniontitle ? : number
    static encode(msg: PlayerBaseInfo): Writer
    static decode(buf: Uint8Array): PlayerBaseInfo
}
export enum ResourceType {
    UNKNOWNTYPE = 0,
        FOOD = 1,
        STONE = 2,
        IRON = 3,
        CRYSTAL = 4,
        FREEGOLD = 5,
        MONEYGOLD = 6,
        GOLD = 7,
        ACTIONTOKEN = 8,
        TRADEGOLD = 9,
}
export class PlayerResource {
    ty ? : ResourceType
    cnt ? : number
    static encode(msg: PlayerResource): Writer
    static decode(buf: Uint8Array): PlayerResource
}
export class PlayerResourceInfo {
    res ? : Array < PlayerResource >
        static encode(msg: PlayerResourceInfo): Writer
    static decode(buf: Uint8Array): PlayerResourceInfo
}
export enum SoldierStatus {
    INSIDE = 0,
        OUTSIDE = 1,
        HURT = 2,
        DEAD = 3,
        SERIOUSINJURY = 4,
}
export class PlayerHero {
    id ? : number
    status ? : number
    static encode(msg: PlayerHero): Writer
    static decode(buf: Uint8Array): PlayerHero
}
export class PlayerHeroInfo {
    hero ? : Array < PlayerHero >
        static encode(msg: PlayerHeroInfo): Writer
    static decode(buf: Uint8Array): PlayerHeroInfo
}
export class HeroLevelInfo {
    id ? : number
    level ? : number
    exp ? : number | Long
    star ? : number
    stage ? : number
    status ? : number
    skillIds ? : Array < number >
        static encode(msg: HeroLevelInfo): Writer
    static decode(buf: Uint8Array): HeroLevelInfo
}
export class PlayerHeroesLevel {
    heroes ? : Array < HeroLevelInfo >
        static encode(msg: PlayerHeroesLevel): Writer
    static decode(buf: Uint8Array): PlayerHeroesLevel
}
export class PlayerSoldier {
    id ? : number
    status ? : number
    count ? : number
    static encode(msg: PlayerSoldier): Writer
    static decode(buf: Uint8Array): PlayerSoldier
}
export class PlayerSoldierInfo {
    soldier ? : Array < PlayerSoldier >
        static encode(msg: PlayerSoldierInfo): Writer
    static decode(buf: Uint8Array): PlayerSoldierInfo
}
export class PlayerAllBarriers {
    playerId ? : number | Long
    barriesGroups ? : Array < OneBarriersGroupInfo >
        static encode(msg: PlayerAllBarriers): Writer
    static decode(buf: Uint8Array): PlayerAllBarriers
}
export class OneBarriersGroupInfo {
    mapId ? : number
    mainBarrier ? : number
    branchBarriers ? : Array < KeyValuePair >
        static encode(msg: OneBarriersGroupInfo): Writer
    static decode(buf: Uint8Array): OneBarriersGroupInfo
}
export enum CombatEffectType {
    CETUNKNOWN = 0,
        BUILD = 1,
        TECH = 2,
        HERO = 3,
        SOLDIER = 4,
}
export class PlayerCombatEffect {
    ty ? : CombatEffectType
    val ? : number | Long
    static encode(msg: PlayerCombatEffect): Writer
    static decode(buf: Uint8Array): PlayerCombatEffect
}
export class PlayerCombatEffectInfo {
    ce ? : Array < PlayerCombatEffect >
        static encode(msg: PlayerCombatEffectInfo): Writer
    static decode(buf: Uint8Array): PlayerCombatEffectInfo
}
export class CombatEffectChangeInfo {
    playerId ? : number | Long
    newData ? : PlayerCombatEffect
    static encode(msg: CombatEffectChangeInfo): Writer
    static decode(buf: Uint8Array): CombatEffectChangeInfo
}
export class RepeatedInt32 {
    num ? : Array < number >
        static encode(msg: RepeatedInt32): Writer
    static decode(buf: Uint8Array): RepeatedInt32
}
export enum BuildingAttribute {
    START = 0,
        FOOD_YIELD = 1,
        WOOD_YIELD = 2,
        IRON_YIELD = 3,
        SILVER_YIELD = 4,
        FOOD_VOLUME = 5,
        WOOD_VOLUME = 6,
        IRON_VOLUME = 7,
        SILVER_VOLUME = 8,
        FOOD_PROTECT = 9,
        WOOD_PROTECT = 10,
        IRON_PROTECT = 11,
        SILVER_PROTECT = 12,
        HOSPITAL_VOLUME = 13,
        LEVELUP_QUEUETIME = 14,
        TRAIN_SOLDIER_QUEUETIME = 15,
        RESEARCH_QUEUE_TIME = 16,
}
export class BuildAttrInfo {
    buildingId ? : number
    attrType ? : number
    intVal ? : Array < number >
        static encode(msg: BuildAttrInfo): Writer
    static decode(buf: Uint8Array): BuildAttrInfo
}
export enum BuildingAttrIncType {
    ATTR_INC_NONE = 0,
        FOOD_YIELD_PERC = 302,
        WOOD_YIELD_PERC = 303,
        IRON_YIELD_PERC = 304,
        SILVER_YIELD_PERC = 305,
        TRAIN_SPEED_PERC = 301,
        RESEARCH_SPEED_PERC = 306,
        LEVELUP_SPEED_PERC = 307,
}
export enum BuildAttrIncSourceType {
    INC_SOURCE_NONE = 0,
        TECHNOLOGY = 1,
        USE_ITEM = 2,
        SELF_LEVELUP = 3,
}
export enum BuildAttrUpdateReason {
    UPDATEATTR_NONE = 0,
        BUILDLEVEUP = 1,
}
export enum Queue_Type {
    NONE = 0,
        BUILD = 1,
        RESEARCH = 2,
        TRAIN = 3,
        TREAT = 4,
        ALL = 9,
}
export class BuildingInfo {
    buildingId ? : number
    buildingTblId ? : number
    level ? : number
    queueType ? : number
    finishTime ? : number | Long
    active ? : number
    productArg ? : Array < number | Long >
        attrs ? : Array < BuildAttrInfo >
        queueTimeLen ? : number
    static encode(msg: BuildingInfo): Writer
    static decode(buf: Uint8Array): BuildingInfo
}
export class BlockInfo {
    id ? : number
    tid ? : number
    x ? : number
    y ? : number
    level ? : number
    static encode(msg: BlockInfo): Writer
    static decode(buf: Uint8Array): BlockInfo
}
export class BuildingsInfo {
    buildings ? : Array < BuildingInfo >
        blocks ? : Array < BlockInfo >
        technologyLevels ? : TechnologyInfo
    recruitInfo ? : RecruitInfo
    bagBlocksIds ? : Array < number >
        bagBlockNums ? : Array < number >
        woundedInfo ? : Array < number >
        attrsIncInfo ? : Array < PlayerAttrsInc >
        mainGunSkills ? : Array < number >
        activeSkills ? : Array < number >
        bagBlockItems ? : bagBlockItemList
    static encode(msg: BuildingsInfo): Writer
    static decode(buf: Uint8Array): BuildingsInfo
}
export class BuildingsAllPlan {
    curId ? : number
    plans ? : Array < BuildingPlan >
        static encode(msg: BuildingsAllPlan): Writer
    static decode(buf: Uint8Array): BuildingsAllPlan
}
export class BuildingPlanItem {
    tid ? : number
    x ? : number
    y ? : number
    level ? : number
    static encode(msg: BuildingPlanItem): Writer
    static decode(buf: Uint8Array): BuildingPlanItem
}
export class BuildingPlan {
    id ? : number
    plan ? : Array < BuildingPlanItem >
        static encode(msg: BuildingPlan): Writer
    static decode(buf: Uint8Array): BuildingPlan
}
export class ChangeSceneRes {
    delIdList ? : Array < number >
        changeBlocks ? : Array < BlockInfo >
        changeBagItems ? : Array < bagBlockItem >
        static encode(msg: ChangeSceneRes): Writer
    static decode(buf: Uint8Array): ChangeSceneRes
}
export class LoginBuildingReq {
    uid ? : number | Long
    sid ? : string
    static encode(msg: LoginBuildingReq): Writer
    static decode(buf: Uint8Array): LoginBuildingReq
}
export class TechnologyInfo {
    techLevels ? : Array < KeyValuePair >
        static encode(msg: TechnologyInfo): Writer
    static decode(buf: Uint8Array): TechnologyInfo
}
export class RecruitOption {
    recruitType ? : number
    times ? : number
    isFree ? : number
    static encode(msg: RecruitOption): Writer
    static decode(buf: Uint8Array): RecruitOption
}
export class AccelerateInfo {
    buildingId ? : number
    itemId ? : Array < number >
        itemNum ? : Array < number >
        buy ? : number
    static encode(msg: AccelerateInfo): Writer
    static decode(buf: Uint8Array): AccelerateInfo
}
export class QueueInfo {
    buildingId ? : number
    qType ? : number
    queueArg ? : Array < number >
        static encode(msg: QueueInfo): Writer
    static decode(buf: Uint8Array): QueueInfo
}
export class RecruitInfo {
    commonFreeTimes ? : number
    useFreeTime ? : number | Long
    hasHighFree ? : number
    getNextHighFree ? : number | Long
    commonNotShow ? : number
    highNotShow ? : number
    static encode(msg: RecruitInfo): Writer
    static decode(buf: Uint8Array): RecruitInfo
}
export class RecruitRes {
    gainItems ? : Array < RecruitGain >
        recruitInfo ? : RecruitOption
    static encode(msg: RecruitRes): Writer
    static decode(buf: Uint8Array): RecruitRes
}
export class RecruitGain {
    tblType ? : number
    tblId ? : number
    gainNum ? : number
    static encode(msg: RecruitGain): Writer
    static decode(buf: Uint8Array): RecruitGain
}
export class TrainInfo {
    soldierId ? : number
    trainNum ? : number
    buildingId ? : number
    static encode(msg: TrainInfo): Writer
    static decode(buf: Uint8Array): TrainInfo
}
export class ResourceInfo {
    playerId ? : number | Long
    resType ? : number
    addVal ? : number
    static encode(msg: ResourceInfo): Writer
    static decode(buf: Uint8Array): ResourceInfo
}
export class CommonChangeInfo {
    playerId ? : number | Long
    tblId ? : number
    addVal ? : number
    changeReason ? : number
    reasonParm ? : number
    static encode(msg: CommonChangeInfo): Writer
    static decode(buf: Uint8Array): CommonChangeInfo
}
export class GetProductResultAll {
    getInfo ? : Array < GetProductResult >
        static encode(msg: GetProductResultAll): Writer
    static decode(buf: Uint8Array): GetProductResultAll
}
export class GetProductResult {
    buildingId ? : number
    productInfo ? : Array < number >
        static encode(msg: GetProductResult): Writer
    static decode(buf: Uint8Array): GetProductResult
}
export class BuildingAttrs {
    attrs ? : Array < BuildAttrInfo >
        static encode(msg: BuildingAttrs): Writer
    static decode(buf: Uint8Array): BuildingAttrs
}
export class SoldiersInfo {
    playerId ? : number | Long
    soldiers ? : Array < KeyValuePair >
        static encode(msg: SoldiersInfo): Writer
    static decode(buf: Uint8Array): SoldiersInfo
}
export class PlayerRequest {
    playerId ? : number | Long
    reqArg ? : number
    static encode(msg: PlayerRequest): Writer
    static decode(buf: Uint8Array): PlayerRequest
}
export class bagBlockItemList {
    blockItem ? : Array < bagBlockItem >
        static encode(msg: bagBlockItemList): Writer
    static decode(buf: Uint8Array): bagBlockItemList
}
export class bagBlockItem {
    blockLevel ? : number
    blockType ? : number
    blockCount ? : number
    static encode(msg: bagBlockItem): Writer
    static decode(buf: Uint8Array): bagBlockItem
}
export class ComposeBackList {
    blockItem ? : Array < bagBlockItem >
        code ? : number
    static encode(msg: ComposeBackList): Writer
    static decode(buf: Uint8Array): ComposeBackList
}
export class SendTurretRequest {
    playerId ? : number | Long
    turretItem ? : bagBlockItem
    static encode(msg: SendTurretRequest): Writer
    static decode(buf: Uint8Array): SendTurretRequest
}
export class GmGetNewTurret {
    turretId ? : number
    turretLevel ? : number
    turretCount ? : number
    static encode(msg: GmGetNewTurret): Writer
    static decode(buf: Uint8Array): GmGetNewTurret
}
export class ComposeInfo {
    turretType ? : number
    composeMaxLvl ? : number
    static encode(msg: ComposeInfo): Writer
    static decode(buf: Uint8Array): ComposeInfo
}
export class ComposeTurretInfo {
    blockId1 ? : number
    blockId2 ? : number
    static encode(msg: ComposeTurretInfo): Writer
    static decode(buf: Uint8Array): ComposeTurretInfo
}
export enum OperationToBit {
    NONEOP = 0,
        TOP = 1,
        BLOCK = 2,
        IGNORE = 3,
        DELETE = 4,
}
export enum ChannelChangeType {
    CHANGE_NONE = 0,
        JOIN_SELF = 1,
        JOIN_INVITE = 2,
        EXIT_SELF = 3,
        EXIT_KICK = 4,
        CREATE = 5,
        DISMISS = 6,
        UNION_MEMBER_JOB_CHANGE = 7,
}
export enum GroupOperationType {
    GROUP_OPSTART = 0,
        SELF_EXIT = 1,
        INVITE_JOIN = 2,
        KICK = 3,
        DISMISSGROUP = 4,
        JOINGROUP_INIT = 5,
        EXIT_AND_DISMISS = 6,
        NOTIFY_ALL = 7,
        MODIFY_GROUP_NAME = 8,
}
export enum GroupDismissReason {
    DISMISSREASON_START = 0,
        MASTER_CHOOSE = 1,
        MASTER_LACK = 2,
        GROUP_EMPTY = 3,
        NOT_ACTIVE_LONG = 4,
        CHANNEL_REMOVE = 5,
}
export enum Chat_Info_Type {
    CHATINFOTYPE_BEGIN = 0,
        P_COMMON = 1,
        P_DYNAMIC = 2,
        S_TIMESTAMP = 3,
        S_GROUP_OP = 4,
        S_CHANNEL_OP = 5,
        P_NOTIFYALL = 6,
}
export class SingleChatInfo {
    cKey ? : ChannelKey
    groupId ? : number
    content ? : string
    senderId ? : number | Long
    aimId ? : Array < number | Long >
        timeStamp ? : number | Long
    infoType ? : number
    senderName ? : string
    opType ? : number
    blockIds ? : Array < number | Long >
        static encode(msg: SingleChatInfo): Writer
    static decode(buf: Uint8Array): SingleChatInfo
}
export class ChatDatas {
    items ? : Array < SingleChatInfo >
        static encode(msg: ChatDatas): Writer
    static decode(buf: Uint8Array): ChatDatas
}
export class ChatReturn {
    code ? : number
    static encode(msg: ChatReturn): Writer
    static decode(buf: Uint8Array): ChatReturn
}
export class ChatRequest {
    channelType ? : number
    channelKey ? : number | Long
    groupId ? : number
    keepChatsNum ? : number
    reqSize ? : number
    static encode(msg: ChatRequest): Writer
    static decode(buf: Uint8Array): ChatRequest
}
export class PlayerInfoForChat {
    playerId ? : number | Long
    unionId ? : number | Long
    frontEnd ? : string
    serverId ? : number
    name ? : string
    static encode(msg: PlayerInfoForChat): Writer
    static decode(buf: Uint8Array): PlayerInfoForChat
}
export class BlockIdList {
    friend ? : Array < Friend >
        static encode(msg: BlockIdList): Writer
    static decode(buf: Uint8Array): BlockIdList
}
export class PlayerChannelData {
    channelRecords ? : Array < SingleChannelData >
        aimIds ? : ULongIdList
    flags ? : Array < number >
        static encode(msg: PlayerChannelData): Writer
    static decode(buf: Uint8Array): PlayerChannelData
}
export class SingleChannelData {
    cKey ? : ChannelKey
    groupId ? : number
    newMsgNum ? : number
    lastContent ? : string
    flags ? : number
    name ? : string
    timeStamp ? : number | Long
    notifyMsg ? : SingleChatInfo
    chatStart ? : number
    createId ? : number
    static encode(msg: SingleChannelData): Writer
    static decode(buf: Uint8Array): SingleChannelData
}
export class GroupOperationInfo {
    gKey ? : GroupKey
    opType ? : number
    aimId ? : Array < number | Long >
        static encode(msg: GroupOperationInfo): Writer
    static decode(buf: Uint8Array): GroupOperationInfo
}
export class BitSetInfo {
    gKey ? : GroupKey
    aimPos ? : number
    aimVal ? : number
    static encode(msg: BitSetInfo): Writer
    static decode(buf: Uint8Array): BitSetInfo
}
export class ChannelKey {
    cType ? : number
    cKey ? : number | Long
    static encode(msg: ChannelKey): Writer
    static decode(buf: Uint8Array): ChannelKey
}
export class GroupKey {
    cKey ? : ChannelKey
    groupId ? : number
    static encode(msg: GroupKey): Writer
    static decode(buf: Uint8Array): GroupKey
}
export class CreateGroupInfo {
    channelType ? : number
    members ? : Array < number | Long >
        name ? : string
    static encode(msg: CreateGroupInfo): Writer
    static decode(buf: Uint8Array): CreateGroupInfo
}
export class ModifyGroupInfo {
    gKey ? : GroupKey
    name ? : string
    static encode(msg: ModifyGroupInfo): Writer
    static decode(buf: Uint8Array): ModifyGroupInfo
}
export class UnionChannelOp {
    playerId ? : number | Long
    unionId ? : number | Long
    opType ? : number
    otherId ? : number | Long
    static encode(msg: UnionChannelOp): Writer
    static decode(buf: Uint8Array): UnionChannelOp
}
export class GetMembersInfoReq {
    cKey ? : ChannelKey
    groupId ? : number
    static encode(msg: GetMembersInfoReq): Writer
    static decode(buf: Uint8Array): GetMembersInfoReq
}
export class GetMembersInfoRsp {
    pInfo ? : Array < PlayerInfo >
        static encode(msg: GetMembersInfoRsp): Writer
    static decode(buf: Uint8Array): GetMembersInfoRsp
}
export class PlayerInfo {
    playerId ? : number | Long
    playerIcon ? : number
    playerName ? : string
    isMaster ? : number
    static encode(msg: PlayerInfo): Writer
    static decode(buf: Uint8Array): PlayerInfo
}
export class GetOnePlrFlagReq {
    playerId ? : number | Long
    static encode(msg: GetOnePlrFlagReq): Writer
    static decode(buf: Uint8Array): GetOnePlrFlagReq
}
export class GetOnePlrFlagRsp {
    flag ? : number
    static encode(msg: GetOnePlrFlagRsp): Writer
    static decode(buf: Uint8Array): GetOnePlrFlagRsp
}
export enum FriendRespCode {
    FRIENDOPERATE_OK = 0,
        FRIENDNOTEXIST = 1,
        MAXFRIENDNUM = 2,
        MAXAPPLYNUM = 3,
        ALREADYINAPPLYLIST = 4,
        ALREADYINFRIENDLIST = 5,
}
export class PlayerId {
    Id ? : number | Long
    static encode(msg: PlayerId): Writer
    static decode(buf: Uint8Array): PlayerId
}
export class Friend {
    playerId ? : number | Long
    playerIcon ? : number
    playerName ? : string
    static encode(msg: Friend): Writer
    static decode(buf: Uint8Array): Friend
}
export class FriendList {
    friends ? : Array < Friend >
        applys ? : Array < Friend >
        static encode(msg: FriendList): Writer
    static decode(buf: Uint8Array): FriendList
}
export class Item {
    id ? : number
    cnt ? : number
    static encode(msg: Item): Writer
    static decode(buf: Uint8Array): Item
}
export class UseItem {
    id ? : number
    cnt ? : number
    selectId ? : number
    directUse ? : number
    static encode(msg: UseItem): Writer
    static decode(buf: Uint8Array): UseItem
}
export class ItemInfoReq {
    static encode(msg: ItemInfoReq): Writer
    static decode(buf: Uint8Array): ItemInfoReq
}
export class ItemInfoRsp {
    item ? : Array < Item >
        static encode(msg: ItemInfoRsp): Writer
    static decode(buf: Uint8Array): ItemInfoRsp
}
export class ItemInfo {
    item ? : Array < Item >
        static encode(msg: ItemInfo): Writer
    static decode(buf: Uint8Array): ItemInfo
}
export class UseItemReq {
    item ? : Array < UseItem >
        static encode(msg: UseItemReq): Writer
    static decode(buf: Uint8Array): UseItemReq
}
export class UseItemRsp {
    result ? : number
    item ? : Array < Item >
        res ? : Array < PlayerResource >
        static encode(msg: UseItemRsp): Writer
    static decode(buf: Uint8Array): UseItemRsp
}
export class UseItemsToHero {
    heroType ? : number
    items ? : Array < Item >
        static encode(msg: UseItemsToHero): Writer
    static decode(buf: Uint8Array): UseItemsToHero
}
export class SynthetizeItemReq {
    src ? : Array < Item >
        targetId ? : number
    static encode(msg: SynthetizeItemReq): Writer
    static decode(buf: Uint8Array): SynthetizeItemReq
}
export class SynthetizeItemRsp {
    result ? : number
    item ? : Array < Item >
        static encode(msg: SynthetizeItemRsp): Writer
    static decode(buf: Uint8Array): SynthetizeItemRsp
}
export class BuyAndUseItemReq {
    buyType ? : number
    item ? : Array < Item >
        static encode(msg: BuyAndUseItemReq): Writer
    static decode(buf: Uint8Array): BuyAndUseItemReq
}
export class BuyAndUseItemRsp {
    result ? : number
    item ? : Array < Item >
        res ? : Array < PlayerResource >
        static encode(msg: BuyAndUseItemRsp): Writer
    static decode(buf: Uint8Array): BuyAndUseItemRsp
}
export enum UnionRespCode {
    UNIONRESP_OK = 0,
        ABBR_USED = 1,
        ABBR_ERROR = 2,
        NAME_USED = 3,
        NAME_ERROR = 4,
        SCREEN_WORD = 5,
        MONEY_NOTENOUGH = 6,
        POWER_LIMIT = 7,
        MEMBER_FULL = 8,
        UNION_DISBANDED = 9,
        NO_AUTHORITY = 10,
        INTRO_ERROR = 11,
        OPERATE_ILLEGA = 12,
        UNION_NOTEXIST = 13,
        MEMBER_NOTEXIST = 14,
        MEMBER_MAXJOBLEVEL = 15,
        MEMBER_MINJOBLEVEL = 16,
        NOT_LEADER = 17,
        PLAYER_NOTEXIST = 18,
        APPLY_MAX = 19,
        IN_UNION = 20,
        HAD_INVITED = 21,
        HAD_REFUSEDCD = 22,
        APPLY_NOTINAPPLYLIST = 23,
        INVITE_NOTININVITELIST = 24,
        DISMISS_NOT_ALLOW = 25,
        RELEADER_CD = 26,
        LEADER_WITHDRAWAL = 27,
        WITHDRAWAL_CD = 28,
}
export enum UnionJoinType {
    JOIN_INVAILD = 0,
        JOIN_FREEDOM = 1,
        JOIN_BYAPPLY = 2,
}
export enum UnionJob {
    JOB_R0 = 0,
        JOB_R1 = 1,
        JOB_R2 = 2,
        JOB_R3 = 3,
        JOB_R4 = 4,
        JOB_R5 = 5,
}
export class UnionInfo {
    unionId ? : number | Long
    abbr ? : string
    name ? : string
    intro ? : string
    joinType ? : number
    power ? : number | Long
    badge ? : number | Long
    memberNum ? : number
    language ? : number
    leaderIcon ? : number
    leaderId ? : number | Long
    leaderName ? : string
    hadApply ? : number
    powerlimit ? : number
    dismissTime ? : number | Long
    static encode(msg: UnionInfo): Writer
    static decode(buf: Uint8Array): UnionInfo
}
export class UnionMemberInfo {
    playerId ? : number | Long
    name ? : string
    icon ? : number
    power ? : number | Long
    kill ? : number
    job ? : number
    title ? : number
    online ? : number
    level ? : number
    static encode(msg: UnionMemberInfo): Writer
    static decode(buf: Uint8Array): UnionMemberInfo
}
export class ApplyPlayerInfo {
    playerId ? : number | Long
    name ? : string
    icon ? : number
    power ? : number | Long
    kill ? : number
    static encode(msg: ApplyPlayerInfo): Writer
    static decode(buf: Uint8Array): ApplyPlayerInfo
}
export class CreateArgs {
    abbr ? : string
    name ? : string
    intro ? : string
    joinType ? : number
    powerLimit ? : number
    badge ? : number | Long
    language ? : number
    static encode(msg: CreateArgs): Writer
    static decode(buf: Uint8Array): CreateArgs
}
export enum UnionLoseReason {
    REASON_WITHDRAWAL = 0,
        REASON_TAKEOFF = 1,
        REASON_DISMISS = 2,
}
export class UnionOperateMsg {
    operate ? : UnionOperateMsg.UOperateType
    unionId ? : number | Long
    playerId ? : number | Long
    otherId ? : number | Long
    static encode(msg: UnionOperateMsg): Writer
    static decode(buf: Uint8Array): UnionOperateMsg
}
export namespace UnionOperateMsg {
    export enum UOperateType {
        APPLY = 0,
            CANCELAPPLY = 1,
            AGREEAPPLY = 2,
            REFUSEAPPLY = 3,
            JOIN = 4,
            WITHDRAWAL = 5,
            TAKEOFF = 6,
            INVITE = 7,
            REFUSEINVITE = 8,
            AGREEINVITE = 9,
            DISMISS = 10,
            CANCELDISMISS = 11,
    }
}
export class UnionJobMsg {
    operate ? : UnionJobMsg.UOperateJobType
    playerId ? : number | Long
    otherId ? : number | Long
    job ? : number
    title ? : number
    static encode(msg: UnionJobMsg): Writer
    static decode(buf: Uint8Array): UnionJobMsg
}
export namespace UnionJobMsg {
    export enum UOperateJobType {
        CONFERTITLE = 0,
            CHANGEJOB = 1,
            ABDICATE = 2,
    }
}
export class UnionId {
    Id ? : number | Long
    static encode(msg: UnionId): Writer
    static decode(buf: Uint8Array): UnionId
}
export class UnionList {
    list ? : Array < UnionInfo >
        applynum ? : number
    static encode(msg: UnionList): Writer
    static decode(buf: Uint8Array): UnionList
}
export class ApplyPlayerList {
    unionList ? : Array < ApplyPlayerInfo >
        static encode(msg: ApplyPlayerList): Writer
    static decode(buf: Uint8Array): ApplyPlayerList
}
export class UnionData {
    unionInfo ? : UnionInfo
    members ? : Array < UnionMemberInfo >
        static encode(msg: UnionData): Writer
    static decode(buf: Uint8Array): UnionData
}
export class UnionMembers {
    members ? : Array < UnionMemberInfo >
        static encode(msg: UnionMembers): Writer
    static decode(buf: Uint8Array): UnionMembers
}
export class SearchArgs {
    keyworld ? : string
    language ? : number
    static encode(msg: SearchArgs): Writer
    static decode(buf: Uint8Array): SearchArgs
}
export class SearchedPlayerInfo {
    playerId ? : number | Long
    name ? : string
    icon ? : number
    power ? : number | Long
    level ? : number
    kill ? : number
    static encode(msg: SearchedPlayerInfo): Writer
    static decode(buf: Uint8Array): SearchedPlayerInfo
}
export class InvitePlayers {
    list ? : Array < SearchedPlayerInfo >
        static encode(msg: InvitePlayers): Writer
    static decode(buf: Uint8Array): InvitePlayers
}
export class EnterServerReq {
    accId ? : string
    token ? : string
    roleId ? : number | Long
    static encode(msg: EnterServerReq): Writer
    static decode(buf: Uint8Array): EnterServerReq
}
export class EnterServerRsp {
    result ? : number
    playerBaseInfo ? : PlayerBaseInfo
    playerHeroInfo ? : PlayerHeroInfo
    playerSoldierInfo ? : PlayerSoldierInfo
    buildingsInfo ? : BuildingsInfo
    wsplayerInfo ? : WsPlayerInfo
    unionInfo ? : UnionData
    playerBlockList ? : Array < Friend >
        taskData ? : PlayerTasksData
    itemlist ? : CommodityList
    heroesLevelInfo ? : PlayerHeroesLevel
    barriersInfo ? : PlayerAllBarriers
    newbieGuide ? : Array < number >
        serverOpenTime ? : number | Long
    serverTime ? : number | Long
    static encode(msg: EnterServerRsp): Writer
    static decode(buf: Uint8Array): EnterServerRsp
}
export class CreateRoleReq {
    accId ? : string
    roleName ? : string
    static encode(msg: CreateRoleReq): Writer
    static decode(buf: Uint8Array): CreateRoleReq
}
export class CreateRoleRsp {
    result ? : number
    roleId ? : number | Long
    static encode(msg: CreateRoleRsp): Writer
    static decode(buf: Uint8Array): CreateRoleRsp
}
export class EnterSceneReq {
    roleId ? : number | Long
    accId ? : string
    frontendId ? : string
    static encode(msg: EnterSceneReq): Writer
    static decode(buf: Uint8Array): EnterSceneReq
}
export class EnterSceneRsp {
    result ? : number
    playerBaseinfo ? : PlayerBaseInfo
    playerHeroInfo ? : PlayerHeroInfo
    playerSoldierInfo ? : PlayerSoldierInfo
    playerBuildings ? : BuildingsInfo
    wsplayerInfo ? : WsPlayerInfo
    unionInfo ? : UnionData
    playerBlockList ? : Array < Friend >
        taskData ? : PlayerTasksData
    itemlist ? : CommodityList
    heroesLevelInfo ? : PlayerHeroesLevel
    barriersInfo ? : PlayerAllBarriers
    newbieGuide ? : Array < number >
        serverOpenTime ? : number | Long
    serverTime ? : number | Long
    static encode(msg: EnterSceneRsp): Writer
    static decode(buf: Uint8Array): EnterSceneRsp
}
export class disconnectMsg {
    Id ? : number | Long
    reason ? : string
    static encode(msg: disconnectMsg): Writer
    static decode(buf: Uint8Array): disconnectMsg
}
export class vect2 {
    x ? : number
    y ? : number
    static encode(msg: vect2): Writer
    static decode(buf: Uint8Array): vect2
}
export class CurPos {
    level ? : number
    posX ? : number
    posY ? : number
    static encode(msg: CurPos): Writer
    static decode(buf: Uint8Array): CurPos
}
export enum WsObjState {
    STATE_INIT = 0,
        STATE_STATION = 1,
        STATE_MARCH = 2,
        STATE_COLLECTING = 3,
        STATE_ATKING = 4,
        STATE_RETURN = 5,
        STATE_RECYCLE = 6,
        STATE_TRANSFER = 7,
}
export enum WsEntityType {
    ENTITY_PLAYER = 0,
        ENTITY_MONSTER = 1,
        ENTITY_RESOURCE = 2,
        ENTITY_BUILDING = 3,
        ENTITY_TROOP = 4,
        ENTITY_SCENEOBJ = 5,
        ENTITY_TRANSFERGATE = 6,
        ENTITY_LAND = 7,
        ENTITY_TRADINGPORT = 8,
        ENTITY_MONSTEROUTPOST = 9,
        ENTITY_MAX_NUM = 10,
}
export class WsObjInfo {
    entityId ? : number | Long
    type ? : number
    level ? : number
    posX ? : number
    posY ? : number
    unionId ? : number | Long
    unionName ? : string
    unionBadge ? : number | Long
    playerId ? : number | Long
    playerName ? : string
    state ? : number
    resId ? : number
    startPosX ? : number
    startPosY ? : number
    endPosX ? : number
    endPosY ? : number
    movespeed ? : number
    battleId ? : number
    transferGate1 ? : number | Long
    transferGate2 ? : number | Long
    timeMs ? : number | Long
    playerBuildings ? : BuildingsInfo
    path ? : Array < vect2 >
        pathIndex ? : number
    summonerId ? : number | Long
    static encode(msg: WsObjInfo): Writer
    static decode(buf: Uint8Array): WsObjInfo
}
export class WsBuildingsInfo {
    entityId ? : number | Long
    playerId ? : number | Long
    posX ? : number
    posY ? : number
    playerBuildings ? : BuildingsInfo
    static encode(msg: WsBuildingsInfo): Writer
    static decode(buf: Uint8Array): WsBuildingsInfo
}
export class WsCollecter {
    playerId ? : number | Long
    unionId ? : number | Long
    unionName ? : string
    playerName ? : string
    speed ? : number
    curNum ? : number
    totalNum ? : number
    troopId ? : number | Long
    entityId ? : number | Long
    static encode(msg: WsCollecter): Writer
    static decode(buf: Uint8Array): WsCollecter
}
export class WsResInfo {
    entityId ? : number | Long
    resNum ? : number
    collecter ? : WsCollecter
    ownerUnionName ? : string
    posX ? : number
    posY ? : number
    static encode(msg: WsResInfo): Writer
    static decode(buf: Uint8Array): WsResInfo
}
export class Troop {
    troopunits ? : Array < TroopUnit >
        path ? : Array < vect2 >
        tarEntityId ? : number | Long
    operate ? : number
    transferGate1 ? : number | Long
    transferGate2 ? : number | Long
    battlePara ? : WsBattlePara
    param ? : number
    static encode(msg: Troop): Writer
    static decode(buf: Uint8Array): Troop
}
export enum ConfigTroopType {
    EXPEDITION_ARMY = 0,
        EXPEDITION_CASTLE = 1,
}
export class ConfigTroop {
    Id ? : number
    type ? : number
    troopunits ? : Array < TroopUnit >
        activeSkills ? : Array < number >
        static encode(msg: ConfigTroop): Writer
    static decode(buf: Uint8Array): ConfigTroop
}
export class ConfigTroopList {
    troops ? : Array < ConfigTroop >
        static encode(msg: ConfigTroopList): Writer
    static decode(buf: Uint8Array): ConfigTroopList
}
export class TroopListReqPara {
    playerId ? : number | Long
    type ? : ConfigTroopType
    static encode(msg: TroopListReqPara): Writer
    static decode(buf: Uint8Array): TroopListReqPara
}
export enum WsOperateType {
    OPERATE_MOVE = 0,
        OPERATE_COLLECT = 1,
        OPERATE_ATK = 2,
        OPERATE_RETURN = 3,
        OPERATE_STOP = 4,
}
export class WsMarch {
    entityId ? : number | Long
    path ? : Array < vect2 >
        tarEntityId ? : number | Long
    operate ? : number
    transferGate1 ? : number | Long
    transferGate2 ? : number | Long
    battlePara ? : WsBattlePara
    param ? : number
    static encode(msg: WsMarch): Writer
    static decode(buf: Uint8Array): WsMarch
}
export class OperateMsg {
    operate ? : number
    arg1 ? : number | Long
    arg2 ? : number | Long
    arg3 ? : number | Long
    arg4 ? : number | Long
    static encode(msg: OperateMsg): Writer
    static decode(buf: Uint8Array): OperateMsg
}
export enum PlayerResType {
    UNKNOWN = 0,
        FOOD = 1,
        STONE = 2,
        IRON = 3,
        CRYSTAL = 4,
        FREEGOLD = 5,
        MONEYGOLD = 6,
        GOLD = 7,
        ACTIONTOKEN = 8,
}
export class ResourceValue {
    resType ? : number
    resValue ? : number | Long
    static encode(msg: ResourceValue): Writer
    static decode(buf: Uint8Array): ResourceValue
}
export class WsObjList {
    addList ? : Array < WsObjInfo >
        delList ? : Array < number | Long >
        static encode(msg: WsObjList): Writer
    static decode(buf: Uint8Array): WsObjList
}
export class WsObjId {
    entityId ? : number | Long
    static encode(msg: WsObjId): Writer
    static decode(buf: Uint8Array): WsObjId
}
export enum WsRespCode {
    OPERATE_OK = 0,
        RES_NOTEXIST = 1,
        RES_NOTREACHABLE = 2,
        TROOP_MAXNUM = 3,
        TROOP_LEADERIDERROR = 4,
        TROOP_SOLDIERIDERROR = 5,
        TROOP_ATKFRIENDTARGET = 6,
        TROOP_INVAILDTARGET = 7,
        TRANSFER_INVAILDTRANSFERGATE = 8,
        CASTLE_NOTEXIST = 9,
        MOVE_INVALIDTARGETPOS = 10,
        TROOP_NOTEXIST = 11,
        TROOP_NOTOWNER = 12,
        TROOP_NOTSELECTLEADER = 13,
        TROOP_NOTSELECTSOLDIER = 14,
        MONSTER_CANTJUMPATK = 15,
}
export class WsUnionList {
    unions ? : Array < WsObjInfo >
        static encode(msg: WsUnionList): Writer
    static decode(buf: Uint8Array): WsUnionList
}
export class WsTroopBasicInfo {
    entityId ? : number | Long
    state ? : number
    leaderId ? : number
    startPosX ? : number
    startPosY ? : number
    endPosX ? : number
    endPosY ? : number
    curPosX ? : number
    curPosY ? : number
    speed ? : number
    totalNum ? : number
    curLoad ? : number
    maxLoad ? : number
    timeMs ? : number | Long
    static encode(msg: WsTroopBasicInfo): Writer
    static decode(buf: Uint8Array): WsTroopBasicInfo
}
export class WsTroopDetail {
    state ? : number
    resInfo ? : WsResInfo
    marchInfo ? : WsObjInfo
    static encode(msg: WsTroopDetail): Writer
    static decode(buf: Uint8Array): WsTroopDetail
}
export class WsPlayerInfo {
    castleInfo ? : WsObjInfo
    troops ? : Array < WsTroopBasicInfo >
        static encode(msg: WsPlayerInfo): Writer
    static decode(buf: Uint8Array): WsPlayerInfo
}
export class GMCreateRoleReq {
    accId ? : string
    roleName ? : string
    playerId ? : number | Long
    frontendId ? : string
    static encode(msg: GMCreateRoleReq): Writer
    static decode(buf: Uint8Array): GMCreateRoleReq
}
export class WsCastleMove {
    tarPos ? : vect2
    tarEntityId ? : number | Long
    operate ? : WsOperateType
    transferGate1 ? : number | Long
    transferGate2 ? : number | Long
    battlePara ? : WsBattlePara
    static encode(msg: WsCastleMove): Writer
    static decode(buf: Uint8Array): WsCastleMove
}
export class WsTransferGateInfo {
    entityId ? : number | Long
    unionId ? : number | Long
    resId ? : number
    static encode(msg: WsTransferGateInfo): Writer
    static decode(buf: Uint8Array): WsTransferGateInfo
}
export class WsTransferGateList {
    list ? : Array < WsTransferGateInfo >
        static encode(msg: WsTransferGateList): Writer
    static decode(buf: Uint8Array): WsTransferGateList
}
export class WsPath {
    point ? : Array < vect2 >
        static encode(msg: WsPath): Writer
    static decode(buf: Uint8Array): WsPath
}
export enum SearchObjType {
    TYPE_MONSTER = 0,
        TYPE_FOOD = 1,
        TYPE_STONE = 2,
        TYPE_IRON = 3,
        TYPE_CRYSTAL = 4,
}
export class SearchPara {
    type ? : SearchObjType
    level ? : number
    static encode(msg: SearchPara): Writer
    static decode(buf: Uint8Array): SearchPara
}
export class SearchedObject {
    entityId ? : number | Long
    posX ? : number
    posY ? : number
    static encode(msg: SearchedObject): Writer
    static decode(buf: Uint8Array): SearchedObject
}
export class SearchedObjectList {
    list ? : Array < SearchedObject >
        static encode(msg: SearchedObjectList): Writer
    static decode(buf: Uint8Array): SearchedObjectList
}
export enum BookmarkRespCode {
    RESP_OK = 0,
        NAMELENGTH_LIMIT = 1,
        TOTALNUM_LIMIT = 2,
}
export class Bookmark {
    type ? : number
    name ? : string
    x ? : number
    y ? : number
    static encode(msg: Bookmark): Writer
    static decode(buf: Uint8Array): Bookmark
}
export class BookmarkList {
    list ? : Array < Bookmark >
        static encode(msg: BookmarkList): Writer
    static decode(buf: Uint8Array): BookmarkList
}
export class RewardInfo {
    type ? : number
    tid ? : number
    count ? : number
    static encode(msg: RewardInfo): Writer
    static decode(buf: Uint8Array): RewardInfo
}
export class GetNewRewardReq {
    playerId ? : number | Long
    list ? : Array < RewardInfo >
        static encode(msg: GetNewRewardReq): Writer
    static decode(buf: Uint8Array): GetNewRewardReq
}
export class MapElement {
    planeTabid ? : number
    planePosX ? : number
    planePosY ? : number
    rot ? : number
    buildLev ? : number
    planeSerial ? : number
    hp ? : number
    hpMax ? : number
    static encode(msg: MapElement): Writer
    static decode(buf: Uint8Array): MapElement
}
export class BatMainSkillInfo {
    skillTid ? : number
    useTimes ? : number
    static encode(msg: BatMainSkillInfo): Writer
    static decode(buf: Uint8Array): BatMainSkillInfo
}
export class BattleHeroSkill {
    heroStar ? : number
    skills ? : Array < number >
        static encode(msg: BattleHeroSkill): Writer
    static decode(buf: Uint8Array): BattleHeroSkill
}
export enum EBatGroup {
    BATGROUPNULL = 0,
        BATGROUPRED = 1,
        BATGROUPBLUE = 2,
}
export class WsBattlePara {
    atkOffX ? : number
    atkOffY ? : number
    defOffX ? : number
    defOffY ? : number
    atkDir ? : number
    static encode(msg: WsBattlePara): Writer
    static decode(buf: Uint8Array): WsBattlePara
}
export class Soldier {
    soldierId ? : number
    soldierNum ? : number
    static encode(msg: Soldier): Writer
    static decode(buf: Uint8Array): Soldier
}
export class TroopUnit {
    leaderId ? : number
    soldiers1 ? : Array < Soldier >
        pos ? : number
    group ? : number
    leaderStar ? : number
    leaderLvId ? : number
    armyId ? : number
    bornX ? : number
    bornY ? : number
    hp ? : number
    hpMax ? : number
    static encode(msg: TroopUnit): Writer
    static decode(buf: Uint8Array): TroopUnit
}
export class BattleRoleData {
    roleId ? : number | Long
    group ? : EBatGroup
    element ? : Array < MapElement >
        army ? : Array < TroopUnit >
        troopId ? : number | Long
    atktype ? : number
    roletype ? : number
    offX ? : number
    offY ? : number
    techAttrs ? : Array < AttrInc >
        mskills ? : Array < number >
        heroSkills ? : Array < BattleHeroSkill >
        autoAssign ? : number
    mainskills ? : Array < BatMainSkillInfo >
        assist ? : number
    static encode(msg: BattleRoleData): Writer
    static decode(buf: Uint8Array): BattleRoleData
}
export enum EBattleType {
    TYPE_UNKNOWN = 0,
        TYPE_PVP = 1,
        TYPE_EXPEDITION = 2,
        TYPE_PKMONSTER = 3,
        TYPE_MUTIBATTLES = 4,
}
export enum ATK_TYPE {
    ATK_UNKNOWN = 0,
        ATK_CASTLE = 1,
        ATK_TROOP = 2,
}
export enum ROLE_TYPE {
    ROLE_UNKNOWN = 0,
        ROLE_PLAYER = 1,
        ROLE_MONSTER = 2,
}
export class BattleData {
    sid ? : string
    battleTabid ? : number
    roles ? : Array < BattleRoleData >
        atkDir ? : number
    battleType ? : number
    battlePhase ? : number
    battleMaxphase ? : number
    static encode(msg: BattleData): Writer
    static decode(buf: Uint8Array): BattleData
}
export class BattleDataClient {
    battleId ? : number
    data ? : BattleData
    srcLen ? : number
    frameData ? : Uint8Array
    static encode(msg: BattleDataClient): Writer
    static decode(buf: Uint8Array): BattleDataClient
}
export class BattleExitSoldier {
    sol ? : Soldier
    pos ? : number
    static encode(msg: BattleExitSoldier): Writer
    static decode(buf: Uint8Array): BattleExitSoldier
}
export class BattleExitBuild {
    planeSerial ? : number
    hp ? : number
    hpMax ? : number
    static encode(msg: BattleExitBuild): Writer
    static decode(buf: Uint8Array): BattleExitBuild
}
export class BattleExitHero {
    heroLv ? : number
    heroStar ? : number
    hp ? : number
    hpMax ? : number
    static encode(msg: BattleExitHero): Writer
    static decode(buf: Uint8Array): BattleExitHero
}
export class BattleExitSkill {
    skillTid ? : number
    leftTimes ? : number
    static encode(msg: BattleExitSkill): Writer
    static decode(buf: Uint8Array): BattleExitSkill
}
export class BattleExitRoleData {
    roleId ? : number | Long
    group ? : EBatGroup
    leftex ? : Array < BattleExitSoldier >
        hurtedex ? : Array < BattleExitSoldier >
        heavyex ? : Array < BattleExitSoldier >
        deadex ? : Array < BattleExitSoldier >
        lostRadio ? : number
    atktype ? : number
    roletype ? : number
    mainGunSkillTimes ? : number
    destroyBuildNum ? : number
    useSkillTimes ? : Array < KeyValuePair >
        builds ? : Array < BattleExitBuild >
        heros ? : Array < BattleExitHero >
        mainskills ? : Array < BattleExitSkill >
        static encode(msg: BattleExitRoleData): Writer
    static decode(buf: Uint8Array): BattleExitRoleData
}
export class PhaseBattleResult {
    battleId ? : number
    phase ? : number
    element ? : Array < MapElement >
        army ? : Array < TroopUnit >
        assist ? : number
    static encode(msg: PhaseBattleResult): Writer
    static decode(buf: Uint8Array): PhaseBattleResult
}
export class NextPhaseBattle {
    battleId ? : number
    phase ? : number
    battlePara ? : WsBattlePara
    static encode(msg: NextPhaseBattle): Writer
    static decode(buf: Uint8Array): NextPhaseBattle
}
export class BattleResult {
    battleId ? : number
    result ? : number
    exitRoles ? : Array < BattleExitRoleData >
        static encode(msg: BattleResult): Writer
    static decode(buf: Uint8Array): BattleResult
}
export class BattleBlockInfo {
    element ? : Array < MapElement >
        static encode(msg: BattleBlockInfo): Writer
    static decode(buf: Uint8Array): BattleBlockInfo
}
export class QuickShot {
    battleId ? : number
    srcLen ? : number
    frameData ? : Uint8Array
    syncRids ? : Array < number | Long >
        static encode(msg: QuickShot): Writer
    static decode(buf: Uint8Array): QuickShot
}
export enum EBatFrameOpT {
    FRAMEOPT_NULL = 0,
        FRAMEOPT_USESKILL = 1,
        FRAMEOPT_PRIORITYATK = 2,
        FRAMEOPT_AUTOASSIGNSOL = 3,
        FRAMEOPT_MANUALASSINGSOL = 4,
        FRAMEOPT_FALLBACK = 5,
        FRAMEOPT_CHECKFRAMEINTER = 6,
        FRAMEOPT_REQFRAMEDATA = 7,
        FRAMEOPT_MAX = 8,
}
export class BattleSyncFrameOps {
    battleId ? : number
    frameId ? : number
    roleId ? : number | Long
    opType ? : number
    opParams ? : Array < number >
        static encode(msg: BattleSyncFrameOps): Writer
    static decode(buf: Uint8Array): BattleSyncFrameOps
}
export class ReqBattleFrameData {
    battleId ? : number
    frameId ? : number
    roleId ? : number | Long
    static encode(msg: ReqBattleFrameData): Writer
    static decode(buf: Uint8Array): ReqBattleFrameData
}
export class BattleFrameOp {
    frameId ? : number
    roleId ? : number | Long
    opType ? : number
    opParams ? : Array < number >
        static encode(msg: BattleFrameOp): Writer
    static decode(buf: Uint8Array): BattleFrameOp
}
export class ResponseBattleFrameData {
    battleId ? : number
    frameId ? : number
    ops ? : Array < BattleFrameOp >
        opcode ? : number
    deltaNum ? : number
    syncRids ? : Array < number | Long >
        static encode(msg: ResponseBattleFrameData): Writer
    static decode(buf: Uint8Array): ResponseBattleFrameData
}
export class BroadcastFrames {
    battleId ? : number
    ops ? : Array < BattleFrameOp >
        frameBound ? : number
    syncRids ? : Array < number | Long >
        winGroup ? : number
    static encode(msg: BroadcastFrames): Writer
    static decode(buf: Uint8Array): BroadcastFrames
}
export enum Task_Type {
    TASKTYPEBEGIN = 0,
        MAIN = 1,
        BRANCH = 2,
        DAILY = 3,
}
export enum Task_Condition {
    TASKCONDBEGIN = 0,
        COLLECTRESOURCE_S = 1,
        COLLECTRESOURCE_D = 2,
        RESEARCHTIMES_D = 3,
        GETTECHNOLOGY = 4,
        KILLMONSTER_D = 5,
        TRAINSOLDIER_D = 6,
        TRAINSOLDIER_S = 7,
        BUILDLEVEL = 8,
        CLICKGETREWARD = 9,
        TRAINSOIDIER_TYPE_D = 10,
        TRAINSOLDIER_TYPE_S = 11,
        PUBRECRUITTIMES_D = 12,
        PUBRECRUITTIMES_S = 13,
        GETRESPRODUCTTIMES_D = 14,
        GETRESPRODUCTTIMES_S = 15,
        USEITEMNUM_D = 16,
        USEITEMNUM_S = 17,
        TREATSOLDIERNUM_D = 18,
        TREATSOLDIERNUM_S = 19,
        USEMAINGUNSKILLTIMES_D = 20,
        USEMAINGUNSKILLTIMES_S = 21,
        DESTROYBUILDINGNUM_D = 22,
        DESTROYBUILDINGNUM_S = 23,
        HEROLEVELUPTIMES_D = 24,
        REACHLEVEL_HERONUM_S = 25,
        HEROSTARINCTIMES_D = 26,
        REACHSTAR_HERONUM_S = 27,
        GETRESPRODUCTNUM_D = 28,
        GETRESPRODUCTNUM_S = 29,
        BARRIERCHALLENGESTIME_D = 30,
        PASSONEBARRIER_S = 31,
        KILLMONSTERBYLEVEL_S = 32,
        KILLMONSTERBYLEVEL_D = 33,
        USEITEMNUMBYTYPE_S = 34,
        USEITEMNUMBYTYPE_D = 35,
        BUILDINGLEVELUPTIMES_D = 36,
        CREATEBUILDINGTIMES_D = 37,
        CREATEBUILDINGTIMES_S = 38,
}
export enum Task_Status {
    TASKNONE = 0,
        SLEEP = 1,
        STARTED = 2,
        FINISH = 3,
        ERROR = 4,
}
export class TaskConditionInfo {
    conditionType ? : number
    sonType ? : number
    val ? : number
    playerId ? : number | Long
    aimVal ? : number
    static encode(msg: TaskConditionInfo): Writer
    static decode(buf: Uint8Array): TaskConditionInfo
}
export class SingleTaskInfo {
    taskType ? : number
    taskId ? : number
    status ? : number
    progress ? : Array < TaskConditionInfo >
        static encode(msg: SingleTaskInfo): Writer
    static decode(buf: Uint8Array): SingleTaskInfo
}
export class PlayerTasksData {
    taskList ? : Array < SingleTaskInfo >
        activePoint ? : number
    boxRecord ? : Array < number >
        lastMainLvl ? : number
    static encode(msg: PlayerTasksData): Writer
    static decode(buf: Uint8Array): PlayerTasksData
}
export enum TradingRespCode {
    TRADINGRESP_OK = 0,
        TRADING_RESNOTENOUGH = 2,
        INVALID_PORTID = 3,
        OUT_DISTANCE = 4,
        DIFF_PRICE = 5,
        STORE_FULL = 6,
        STORE_ERROR = 7,
        INVALID_ITEMID = 8,
        INVALID_ITEMNUM = 9,
}
export class CommodityInfo {
    itemId ? : number
    itemNum ? : number
    buyPrice ? : number
    portId ? : number
    static encode(msg: CommodityInfo): Writer
    static decode(buf: Uint8Array): CommodityInfo
}
export class PortSellPrice {
    itemId ? : number
    price ? : number
    scarcePortId ? : number
    fashionPortId ? : number
    static encode(msg: PortSellPrice): Writer
    static decode(buf: Uint8Array): PortSellPrice
}
export class PortInfo {
    portTableId ? : number
    resetTime ? : number | Long
    list ? : Array < PortSellPrice >
        scarceItemId ? : number
    scarceUpdateTime ? : number | Long
    fashionItemId ? : number
    fashionUpdateTime ? : number | Long
    prosperity ? : number
    scarceItemPrice ? : number
    fashionItemPrice ? : number
    static encode(msg: PortInfo): Writer
    static decode(buf: Uint8Array): PortInfo
}
export class ItemIdNum {
    itemId ? : number
    itemNum ? : number
    static encode(msg: ItemIdNum): Writer
    static decode(buf: Uint8Array): ItemIdNum
}
export class BuyItem {
    portEntityId ? : number | Long
    Items ? : Array < ItemIdNum >
        static encode(msg: BuyItem): Writer
    static decode(buf: Uint8Array): BuyItem
}
export class SellItem {
    portEntityId ? : number | Long
    Items ? : Array < ItemIdNum >
        static encode(msg: SellItem): Writer
    static decode(buf: Uint8Array): SellItem
}
export class tradingPortId {
    portEntityId ? : number | Long
    static encode(msg: tradingPortId): Writer
    static decode(buf: Uint8Array): tradingPortId
}
export class CommodityList {
    list ? : Array < CommodityInfo >
        static encode(msg: CommodityList): Writer
    static decode(buf: Uint8Array): CommodityList
}
export enum TradingPortType {
    TYPE_NULL = 0,
        TYPE_PRODUCT = 1,
        TYPE_SCARCE = 2,
        TYPE_FASHION = 3,
}
export class TradingPortInfo {
    portId ? : number | Long
    prosperity ? : number
    portType ? : number
    popRefreshTtime ? : number | Long
    static encode(msg: TradingPortInfo): Writer
    static decode(buf: Uint8Array): TradingPortInfo
}
export class GoodsPortInfo {
    itemId ? : number
    portInfo ? : TradingPortInfo
    static encode(msg: GoodsPortInfo): Writer
    static decode(buf: Uint8Array): GoodsPortInfo
}
export class GoodsInfo {
    itemId ? : number
    buyPortId ? : number
    buyprosperity ? : number
    sellPortId ? : number
    sellPortType ? : number
    sellprosperity ? : number
    static encode(msg: GoodsInfo): Writer
    static decode(buf: Uint8Array): GoodsInfo
}
export class TradingMainInfo {
    exp ? : number
    buyGoods ? : GoodsPortInfo
    sellGoods ? : GoodsPortInfo
    goods ? : Array < GoodsInfo >
        static encode(msg: TradingMainInfo): Writer
    static decode(buf: Uint8Array): TradingMainInfo
}
export class AutoTrade {
    tarAreaId ? : number
    time ? : number
    static encode(msg: AutoTrade): Writer
    static decode(buf: Uint8Array): AutoTrade
}
export class TradingMarket {
    goods ? : Array < GoodsPortInfo >
        static encode(msg: TradingMarket): Writer
    static decode(buf: Uint8Array): TradingMarket
}
export class PortAndCommodityInfo {
    itemId ? : number
    portId ? : number | Long
    static encode(msg: PortAndCommodityInfo): Writer
    static decode(buf: Uint8Array): PortAndCommodityInfo
}
export enum RouteStrategy {
    TYPE_NEAREST = 0,
        TYPE_SAMEAREA = 1,
        TYPE_NEXTAREA = 2,
        TYPE_TOCENTERAREA = 3,
        TYPE_FROMCENTERAREA = 4,
}
export class TradeRouteInfo {
    income ? : number
    finishTime ? : number
    port ? : Array < PortAndCommodityInfo >
        static encode(msg: TradeRouteInfo): Writer
    static decode(buf: Uint8Array): TradeRouteInfo
}
export enum MailType {
    UNKNOWN = 0,
        PERSONAL = 1,
        REPORT = 2,
        UNION = 3,
        SYSTEM = 4,
        SEND = 5,
}
export enum MailReceiverType {
    MRT_UNKNOWN = 0,
        MRT_PLAYER = 1,
        MRT_MULTI_PLAYER = 2,
        MRT_UNION = 3,
        MRT_SERVER = 4,
        MRT_GLOBAL = 5,
}
export class MailID {
    ty ? : MailType
    id ? : number | Long
    static encode(msg: MailID): Writer
    static decode(buf: Uint8Array): MailID
}
export class Offset {
    ty ? : MailType
    oft ? : number | Long
    static encode(msg: Offset): Writer
    static decode(buf: Uint8Array): Offset
}
export class Title {
    id ? : MailID
    configId ? : number
    name ? : string
    createTime ? : number | Long
    collectTime ? : number | Long
    read ? : number
    recv ? : number
    imageId ? : number
    title ? : string
    senderId ? : number | Long
    static encode(msg: Title): Writer
    static decode(buf: Uint8Array): Title
}
export class Res {
    ty ? : number
    cnt ? : number
    static encode(msg: Res): Writer
    static decode(buf: Uint8Array): Res
}
export class Content {
    id ? : MailID
    content ? : string
    res ? : Array < Res >
        item ? : Array < Item >
        static encode(msg: Content): Writer
    static decode(buf: Uint8Array): Content
}
export class GetNewerMailTitleReq {
    offset ? : Array < Offset >
        static encode(msg: GetNewerMailTitleReq): Writer
    static decode(buf: Uint8Array): GetNewerMailTitleReq
}
export class GetNewerMailTitleRsp {
    t ? : Array < Title >
        offset ? : Array < Offset >
        static encode(msg: GetNewerMailTitleRsp): Writer
    static decode(buf: Uint8Array): GetNewerMailTitleRsp
}
export class GetMailTitleReq {
    id ? : Array < MailID >
        static encode(msg: GetMailTitleReq): Writer
    static decode(buf: Uint8Array): GetMailTitleReq
}
export class GetMailTitleRsp {
    t ? : Array < Title >
        static encode(msg: GetMailTitleRsp): Writer
    static decode(buf: Uint8Array): GetMailTitleRsp
}
export class GetMailContentReq {
    id ? : Array < MailID >
        static encode(msg: GetMailContentReq): Writer
    static decode(buf: Uint8Array): GetMailContentReq
}
export class GetMailContentRsp {
    c ? : Array < Content >
        static encode(msg: GetMailContentRsp): Writer
    static decode(buf: Uint8Array): GetMailContentRsp
}
export class ReadMailReq {
    id ? : MailID
    static encode(msg: ReadMailReq): Writer
    static decode(buf: Uint8Array): ReadMailReq
}
export class ReadMailRsp {
    result ? : number
    static encode(msg: ReadMailRsp): Writer
    static decode(buf: Uint8Array): ReadMailRsp
}
export class RecvMailAwardReq {
    id ? : MailID
    static encode(msg: RecvMailAwardReq): Writer
    static decode(buf: Uint8Array): RecvMailAwardReq
}
export class RecvMailAwardRsp {
    result ? : number
    static encode(msg: RecvMailAwardRsp): Writer
    static decode(buf: Uint8Array): RecvMailAwardRsp
}
export class ReadRecvAllMailReq {
    id ? : Array < MailID >
        static encode(msg: ReadRecvAllMailReq): Writer
    static decode(buf: Uint8Array): ReadRecvAllMailReq
}
export class ReadRecvAllMailRsp {
    result ? : number
    static encode(msg: ReadRecvAllMailRsp): Writer
    static decode(buf: Uint8Array): ReadRecvAllMailRsp
}
export class CollectMailReq {
    id ? : MailID
    static encode(msg: CollectMailReq): Writer
    static decode(buf: Uint8Array): CollectMailReq
}
export class CollectMailRsp {
    result ? : number
    static encode(msg: CollectMailRsp): Writer
    static decode(buf: Uint8Array): CollectMailRsp
}
export class DeleteMailReq {
    id ? : Array < MailID >
        static encode(msg: DeleteMailReq): Writer
    static decode(buf: Uint8Array): DeleteMailReq
}
export class DeleteMailRsp {
    result ? : number
    static encode(msg: DeleteMailRsp): Writer
    static decode(buf: Uint8Array): DeleteMailRsp
}
export class MailReceiver {
    receiverId ? : number | Long
    receiverName ? : string
    receiverImageId ? : number
    static encode(msg: MailReceiver): Writer
    static decode(buf: Uint8Array): MailReceiver
}
export class SendMailReq {
    receiver ? : Array < MailReceiver >
        title ? : string
    content ? : string
    static encode(msg: SendMailReq): Writer
    static decode(buf: Uint8Array): SendMailReq
}
export class SendMailRsp {
    result ? : number
    id ? : number | Long
    static encode(msg: SendMailRsp): Writer
    static decode(buf: Uint8Array): SendMailRsp
}
export class NotifyNewMail {
    id ? : Array < MailID >
        static encode(msg: NotifyNewMail): Writer
    static decode(buf: Uint8Array): NotifyNewMail
}
export class MailAttach {
    playerId ? : number | Long
    res ? : Array < Res >
        item ? : Array < Item >
        static encode(msg: MailAttach): Writer
    static decode(buf: Uint8Array): MailAttach
}
export class SvrSendMailReq {
    ty ? : MailType
    senderId ? : number | Long
    senderName ? : string
    senderImageId ? : number
    receiverType ? : MailReceiverType
    receiver ? : number | Long
    recvPlayer ? : Array < MailReceiver >
        reserveTime ? : number | Long
    configId ? : number
    title ? : string
    content ? : string
    attach ? : Array < MailAttach >
        static encode(msg: SvrSendMailReq): Writer
    static decode(buf: Uint8Array): SvrSendMailReq
}
export class SvrSendMailRsp {
    result ? : number
    id ? : number | Long
    static encode(msg: SvrSendMailRsp): Writer
    static decode(buf: Uint8Array): SvrSendMailRsp
}
export class GMSendMail {
    recTy ? : string
    recTyId ? : string
    receiverId ? : Array < number | Long >
        title ? : string
    content ? : string
    item ? : Array < Item >
        res ? : Array < Res >
        reserveTime ? : number | Long
    static encode(msg: GMSendMail): Writer
    static decode(buf: Uint8Array): GMSendMail
}
export class PlayerTransferToDstSvrReq {
    dstServerId ? : number
    static encode(msg: PlayerTransferToDstSvrReq): Writer
    static decode(buf: Uint8Array): PlayerTransferToDstSvrReq
}
export class PlayerTransferToDstSvrRsp {
    result ? : number
    static encode(msg: PlayerTransferToDstSvrRsp): Writer
    static decode(buf: Uint8Array): PlayerTransferToDstSvrRsp
}
export class AskTransferToDstSvrReq {
    playerBaseInfo ? : PlayerBaseInfo
    static encode(msg: AskTransferToDstSvrReq): Writer
    static decode(buf: Uint8Array): AskTransferToDstSvrReq
}
export class AskTransferToDstSvrRsp {
    result ? : number
    static encode(msg: AskTransferToDstSvrRsp): Writer
    static decode(buf: Uint8Array): AskTransferToDstSvrRsp
}
export class StartExpedition {
    troops ? : Array < ConfigTroop >
        battlePara ? : WsBattlePara
    stageId ? : number
    static encode(msg: StartExpedition): Writer
    static decode(buf: Uint8Array): StartExpedition
}
export class ExpeditionBattleEnd {
    stageId ? : number
    win ? : number
    left ? : Array < Soldier >
        hurted ? : Array < Soldier >
        heavy ? : Array < Soldier >
        dead ? : Array < Soldier >
        static encode(msg: ExpeditionBattleEnd): Writer
    static decode(buf: Uint8Array): ExpeditionBattleEnd
}
export class HeroEquip {
    equipId ? : number
    equipType ? : number
    affixId ? : number
    heroId ? : number
    static encode(msg: HeroEquip): Writer
    static decode(buf: Uint8Array): HeroEquip
}
export class GMEquipInfo {
    equipType ? : number
    affixId ? : number
    static encode(msg: GMEquipInfo): Writer
    static decode(buf: Uint8Array): GMEquipInfo
}
export class Stuff {
    stuffId ? : number
    stuffCount ? : number
    static encode(msg: Stuff): Writer
    static decode(buf: Uint8Array): Stuff
}
export class StuffList {
    stuff ? : Array < Stuff >
        static encode(msg: StuffList): Writer
    static decode(buf: Uint8Array): StuffList
}
export class SynthetizeStuffReq {
    stuff ? : Array < Stuff >
        targetId ? : number
    static encode(msg: SynthetizeStuffReq): Writer
    static decode(buf: Uint8Array): SynthetizeStuffReq
}
export class SynthetizeStuffRsp {
    result ? : number
    stuff ? : Array < Stuff >
        static encode(msg: SynthetizeStuffRsp): Writer
    static decode(buf: Uint8Array): SynthetizeStuffRsp
}
export class HeroEquipList {
    heroList ? : Array < HeroEquip >
        static encode(msg: HeroEquipList): Writer
    static decode(buf: Uint8Array): HeroEquipList
}
export class SetHeroEquipReq {
    heroId ? : number
    oldEquipId ? : number
    newEquipId ? : number
    static encode(msg: SetHeroEquipReq): Writer
    static decode(buf: Uint8Array): SetHeroEquipReq
}
export class GetStuffsReq {
    static encode(msg: GetStuffsReq): Writer
    static decode(buf: Uint8Array): GetStuffsReq
}
export class GetStuffsRsp {
    stuff ? : Array < Stuff >
        static encode(msg: GetStuffsRsp): Writer
    static decode(buf: Uint8Array): GetStuffsRsp
}
export class GetAllEquipReq {
    static encode(msg: GetAllEquipReq): Writer
    static decode(buf: Uint8Array): GetAllEquipReq
}
export class GetAllEquipRsp {
    equip ? : Array < HeroEquip >
        stuff ? : Array < Stuff >
        static encode(msg: GetAllEquipRsp): Writer
    static decode(buf: Uint8Array): GetAllEquipRsp
}
export class ComposeEquipReq {
    equipType ? : number
    static encode(msg: ComposeEquipReq): Writer
    static decode(buf: Uint8Array): ComposeEquipReq
}
export class ComposeEquipRsp {
    result ? : number
    equip ? : HeroEquip
    stuff ? : Array < Stuff >
        static encode(msg: ComposeEquipRsp): Writer
    static decode(buf: Uint8Array): ComposeEquipRsp
}
export class DeComposeEquipReq {
    equip ? : HeroEquip
    static encode(msg: DeComposeEquipReq): Writer
    static decode(buf: Uint8Array): DeComposeEquipReq
}
export class DeComposeEquipRsp {
    result ? : number
    stuff ? : Array < Stuff >
        static encode(msg: DeComposeEquipRsp): Writer
    static decode(buf: Uint8Array): DeComposeEquipRsp
}
export class ComposeManyStuffReq {
    result ? : number
    stuffList ? : Array < StuffList >
        static encode(msg: ComposeManyStuffReq): Writer
    static decode(buf: Uint8Array): ComposeManyStuffReq
}
export class ComposeManyStuffRsp {
    result ? : number
    stuff ? : Array < Stuff >
        static encode(msg: ComposeManyStuffRsp): Writer
    static decode(buf: Uint8Array): ComposeManyStuffRsp
}