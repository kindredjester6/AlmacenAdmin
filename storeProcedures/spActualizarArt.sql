USE [Warehouse]
GO
/****** Object:  StoredProcedure [dbo].[spActualizarArticulo]    Script Date: 16/9/2023 06:10:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[spActualizarArticulo]
	-- Add the parameters for the stored procedure here
	-- clase de articulo, código y nombre de articulo, y precio
	@inCodigo varchar(32)
	, @inNewCode varchar(128)
	, @inNameArt varchar(128)
	, @inPrecio money
	, @inNumClass int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	DECLARE @outResultCode int
	SET @outResultCode=0;
	SET NOCOUNT ON;
	if not EXISTS(select 1 from Articulo A where A.Codigo = @inCodigo) and 
		not EXISTS(SELECT 1 FROM dbo.Articulo A WHERE LOWER(A.Nombre)=LOWER(@inNameArt))
	begin
		update Articulo 
		set Nombre = @inNameArt

		update Articulo 
		set Codigo = @inNewCode

		update Articulo 
		set IdClaseArticulo = @inNumClass

		update Articulo 
		set Precio = @inPrecio

		select @outResultCode;
		return;
	end
	if not EXISTS(select 1 from Articulo A where A.Codigo = @inCodigo)
	begin
		set @outResultCode = 50003; --Codigo de articulo exist
		select @outResultCode as result
		return;
	end
	else if not EXISTS(select 1 from Articulo A where A.Nombre = @inNameArt)
	begin
		set @outResultCode = 50004; --Nombre de articulo exist
		select @outResultCode as result
		return;
	end
END
